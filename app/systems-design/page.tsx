import Link from "next/link";

export const metadata = {
	title: "Systems Design",
	description:
		"Clear system design case studies from real project repositories, with block diagrams, decisions, and failure notes.",
};

type DiagramLayer = {
	label: string;
	nodes: string[];
	tone: "input" | "process" | "intelligence" | "output";
};

type BeforeAfterItem = {
	label: string;
	before: string;
	after: string;
};

type FailureStory = {
	title: string;
	symptom: string;
	rootCause: string;
	fix: string;
	result: string;
};

type DecisionRow = {
	topic: string;
	options: string;
	decision: string;
	why: string;
};

type CaseStudy = {
	title: string;
	projectName: string;
	projectHref: string;
	repoHref: string;
	context: string;
	problem: string;
	requirements: string[];
	impact: { label: string; value: string }[];
	role: string[];
	architectureFlow: string[];
	diagramLayers: DiagramLayer[];
	beforeAfter: BeforeAfterItem[];
	failureStory: FailureStory;
	decisionTable: DecisionRow[];
	tradeoffs: string[];
	notes: string[];
	improvements: string[];
	proofLinks: { label: string; href: string }[];
};

const layerToneClasses: Record<DiagramLayer["tone"], string> = {
	input: "border-emerald-200 bg-emerald-50",
	process: "border-blue-200 bg-blue-50",
	intelligence: "border-violet-200 bg-violet-50",
	output: "border-amber-200 bg-amber-50",
};

function SystemBlockDiagram({ layers }: { layers: DiagramLayer[] }) {
	return (
		<div className="overflow-x-auto rounded-xl border border-gray-200 bg-gray-50/70 p-3 sm:p-4">
			<div className="inline-flex items-start gap-3">
				{layers.map((layer, index) => (
					<div key={layer.label} className="flex items-start gap-3">
						<div
							className={`w-64 shrink-0 rounded-lg border p-3 shadow-sm ${layerToneClasses[layer.tone]}`}
						>
							<p className="text-[11px] uppercase tracking-wider text-gray-600">
								{layer.label}
							</p>
							<div className="mt-2 space-y-1.5">
								{layer.nodes.map((node, nodeIndex) => (
									<div key={node}>
										<div className="rounded-md border border-white/90 bg-white px-2.5 py-1.5 text-xs text-gray-800">
											{node}
										</div>
										{nodeIndex < layer.nodes.length - 1 ? (
											<div className="py-0.5 text-center text-[11px] text-gray-300">
												↓
											</div>
										) : null}
									</div>
								))}
							</div>
						</div>
						{index < layers.length - 1 ? (
							<div
								className="pt-20 text-xl text-gray-400 select-none"
								aria-hidden="true"
							>
								→
							</div>
						) : null}
					</div>
				))}
			</div>
		</div>
	);
}

const caseStudies = [
	{
		title: "AI Code Reviewer: Review Flow",
		projectName: "AI Code Reviewer",
		projectHref: "/projects/AICodeReviewer",
		repoHref: "https://github.com/mohammedfirdouss/ai_code_reviewer",
		context:
			"Built from the ai_code_reviewer repository. It uses a Cloudflare Worker, a Durable Object for saved history, and WebSocket streaming for live output.",
		problem:
			"Reviews felt too slow, and we also needed to save history and block abuse on a public endpoint.",
		requirements: [
			"show review output live in the browser",
			"save review and chat history for each client session",
			"limit requests to stop spam and overload",
		],
		impact: [
			{
				label: "Review modes",
				value: "4 (quick, security, performance, docs)",
			},
			{ label: "Model", value: "Workers AI Llama 3.3 70B" },
			{
				label: "Saved history limit",
				value: "100 reviews / 200 messages per agent",
			},
		],
		role: [
			"Built Worker routes for `/agent`, `/api/review`, and support endpoints.",
			"Used Durable Objects to save each client's review history.",
			"Added language checks before running the model.",
		],
		architectureFlow: [
			"React app",
			"WebSocket or HTTP request",
			"Worker router and rate limit",
			"Durable Object agent",
			"Review service and Workers AI",
			"Live response and saved history",
		],
		diagramLayers: [
			{
				label: "Input",
				nodes: ["Code", "Selected language", "Review type"],
				tone: "input",
			},
			{
				label: "Processing",
				nodes: ["/agent routing", "Rate limiting", "CORS and API entry"],
				tone: "process",
			},
			{
				label: "Review logic",
				nodes: ["Language check", "CodeReviewService", "Workers AI model"],
				tone: "intelligence",
			},
			{
				label: "Output",
				nodes: [
					"WebSocket stream chunks",
					"Saved review list",
					"Status endpoints",
				],
				tone: "output",
			},
		],
		beforeAfter: [
			{
				label: "Response model",
				before: "one full response at the end",
				after: "small streamed chunks over WebSocket",
			},
			{
				label: "Session memory",
				before: "no saved session memory",
				after: "Durable Object saves review history per client",
			},
			{
				label: "Input checks",
				before: "trusted the selected language",
				after: "checks for language mismatch before review",
			},
		],
		failureStory: {
			title: "Wrong language selection gave bad reviews",
			symptom:
				"Code sent with the wrong selected language returned poor feedback.",
			rootCause:
				"The review flow trusted user input and did not check enough.",
			fix: "Added language detection and reject-on-mismatch before the AI call.",
			result:
				"Wrong requests now fail early with a clear language error.",
		},
		decisionTable: [
			{
				topic: "Request style",
				options: "REST polling vs WebSocket streaming",
				decision: "WebSocket streaming",
				why: "Users see output sooner as it arrives.",
			},
			{
				topic: "Where to save session data",
				options: "Stateless Worker vs Durable Object",
				decision: "Durable Object",
				why: "Easy way to keep per-client history with size limits.",
			},
			{
				topic: "Language handling",
				options: "Trust user selection vs detect + validate",
				decision: "Detect + validate",
				why: "Stops avoidable bad reviews from wrong language picks.",
			},
		],
		tradeoffs: [
			"Saving history helps users, but you must manage data size.",
			"Strict language checks improve quality, but may reject mixed snippets.",
		],
		notes: [
			"The Worker supports both live streaming and normal requests.",
			"History caps in Durable Objects stop unbounded growth.",
		],
		improvements: [
			"Show time-to-first-output and total completion time as metrics.",
			"Add clear severity levels to saved review output.",
		],
		proofLinks: [
			{ label: "Project page", href: "/projects/AICodeReviewer" },
			{
				label: "Worker router",
				href: "https://github.com/mohammedfirdouss/ai_code_reviewer/blob/main/worker/index.ts",
			},
			{
				label: "Durable Object agent",
				href: "https://github.com/mohammedfirdouss/ai_code_reviewer/blob/main/worker/agent.ts",
			},
			{
				label: "Review service",
				href: "https://github.com/mohammedfirdouss/ai_code_reviewer/blob/main/worker/lib/code-review-service.ts",
			},
		],
	},
	{
		title: "AWS Analytics: S3 → Glue → Athena → QuickSight",
		projectName: "AWS Analytics Pipeline",
		projectHref: "/projects/AWSAnalyticsPipeline",
		repoHref: "https://github.com/mohammedfirdouss/aws-analytics-pipeline-viz",
		context:
			"Built from scripts and notes in aws-analytics-pipeline-viz. It covers S3 uploads, Glue crawler setup, Athena queries, and QuickSight setup.",
		problem:
			"Needed a repeatable way to move from raw CSV files to SQL queries and dashboard charts.",
		requirements: [
			"automate data upload and setup with scripts",
			"create table metadata for SQL without manual table edits",
			"build one data flow from source file to dashboard",
		],
		impact: [
			{ label: "Dataset", value: "Amazon Sales Dataset (~4.7 MB CSV)" },
			{
				label: "Quick check query",
				value: "Athena `SELECT ... LIMIT 10` execution path",
			},
			{
				label: "Focused query",
				value: "Top 15 filtered rows by product_id + rating",
			},
		],
		role: [
			"Automated S3 bucket creation and dataset upload via shell script.",
			"Set up Glue database and crawler to read schema from S3 data.",
			"Ran Athena queries and connected Athena to QuickSight datasets.",
		],
		architectureFlow: [
			"CSV file",
			"S3 upload script",
			"Glue database and crawler",
			"Athena query scripts",
			"QuickSight data source",
			"Dashboard charts",
		],
		diagramLayers: [
			{
				label: "Input",
				nodes: ["Amazon Sales CSV", "Environment variables", "Shell scripts"],
				tone: "input",
			},
			{
				label: "Processing",
				nodes: [
					"S3 bucket setup",
					"Glue DB creation",
					"Crawler scan",
				],
				tone: "process",
			},
			{
				label: "Query and reporting",
				nodes: [
					"Athena SQL execution",
					"SQL queries from catalog schema",
					"QuickSight dataset setup",
				],
				tone: "intelligence",
			},
			{
				label: "Output",
				nodes: [
					"Query result files in S3",
					"Filtered query results",
					"Dashboard charts",
				],
				tone: "output",
			},
		],
		beforeAfter: [
			{
				label: "Bucket provisioning",
				before: "manual bucket creation with region mismatch errors",
				after: "script creates bucket with the right region settings",
			},
			{
				label: "Schema discovery",
				before: "manual guesses about columns and table shape",
				after: "Glue crawler creates catalog tables for Athena",
			},
			{
				label: "Analysis mode",
				before: "raw file inspection",
				after: "repeatable SQL queries plus QuickSight dashboard connection",
			},
		],
		failureStory: {
			title: "S3 bucket creation failed with region constraint error",
			symptom: "Bucket creation returned IllegalLocationConstraintException.",
			rootCause:
				"Bucket creation request used location settings that did not match the chosen AWS region.",
			fix: "Updated scripts to include the correct location setting on create.",
			result:
				"Bucket creation and upload worked, so the next steps could run.",
		},
		decisionTable: [
			{
				topic: "Data lake location",
				options: "Local files only vs S3-backed source of truth",
				decision: "S3-backed source",
				why: "Needed durable storage that works with Glue and Athena.",
			},
			{
				topic: "Schema strategy",
				options: "Manual table definitions vs Glue crawler metadata",
				decision: "Glue crawler",
				why: "Less manual setup and fewer schema mistakes.",
			},
			{
				topic: "QuickSight query mode",
				options: "Direct query vs SPICE import",
				decision: "SPICE for dashboarding path",
				why: "Dashboards load faster for users.",
			},
		],
		tradeoffs: [
			"Managed AWS services reduce ops work, but debugging is split across tools.",
			"Scripted setup is repeatable, but env vars must be set correctly.",
		],
		notes: [
			"Proof is spread across scripts and service notes, not one large file.",
			"Athena scripts include a quick table check and a targeted product query.",
		],
		improvements: [
			"Add scheduled refresh and data quality checks.",
			"Use partitioning and Parquet to lower query scan cost.",
		],
		proofLinks: [
			{ label: "Project page", href: "/projects/AWSAnalyticsPipeline" },
			{
				label: "S3 upload script",
				href: "https://github.com/mohammedfirdouss/aws-analytics-pipeline-viz/blob/main/bin/s3-bucket/upload_to_s3",
			},
			{
				label: "Glue crawler script",
				href: "https://github.com/mohammedfirdouss/aws-analytics-pipeline-viz/blob/main/bin/aws-glue/crawler_script",
			},
			{
				label: "Athena execution script",
				href: "https://github.com/mohammedfirdouss/aws-analytics-pipeline-viz/blob/main/bin/aws-athena/query_execution",
			},
			{
				label: "Athena SQL sample",
				href: "https://github.com/mohammedfirdouss/aws-analytics-pipeline-viz/blob/main/bin/aws-athena/sample_query.sql",
			},
			{
				label: "QuickSight journal",
				href: "https://github.com/mohammedfirdouss/aws-analytics-pipeline-viz/blob/main/journal-for-aws-services-used/QuickSight.md",
			},
		],
	},
] satisfies CaseStudy[];

export default function SystemsDesignPage() {
	return (
		<div>
			<h1 className="font-display text-5xl sm:text-6xl md:text-7xl xl:text-8xl text-gray-200 mb-8">
				systems design
			</h1>
			<div className="text-lg text-gray-700 mb-12 max-w-3xl space-y-4">
				<p>
					Real case studies from my own repositories. Each one has a block
					diagram, before/after changes, one failure story, and direct links
					to the code.
				</p>
			</div>

			<div className="space-y-8">
				{caseStudies.map((study) => (
					<section
						key={study.title}
						className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6"
					>
						<div className="flex flex-wrap items-center gap-2">
							<h2 className="text-xl font-semibold text-gray-900">
								{study.title}
							</h2>
							<span className="text-xs rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-gray-600">
								{study.projectName}
							</span>
						</div>
						<p className="mt-3 text-gray-700">
							<span className="font-medium text-gray-900">Problem:</span>{" "}
							{study.problem}
						</p>
						<p className="mt-2 text-sm text-gray-600">{study.context}</p>
						<div className="mt-2 text-sm">
							<a
								href={study.repoHref}
								target="_blank"
								rel="noopener noreferrer"
								className="text-sky-700 hover:underline"
							>
								Open repository →
							</a>
							<span className="text-gray-300 mx-2">·</span>
							<Link
								href={study.projectHref}
								className="text-sky-700 hover:underline"
							>
								Open project page →
							</Link>
						</div>

						<div className="mt-4">
							<h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
								Quick Facts
							</h3>
							<div className="grid gap-2 sm:grid-cols-3">
								{study.impact.map((item) => (
									<div
										key={item.label}
										className="rounded-lg border border-sky-200 bg-sky-50 px-3 py-2"
									>
										<p className="text-[11px] uppercase tracking-wide text-sky-700">
											{item.label}
										</p>
										<p className="text-sm font-medium text-sky-900">
											{item.value}
										</p>
									</div>
								))}
							</div>
						</div>

						<div className="mt-4">
							<h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
								System Block Diagram
							</h3>
							<SystemBlockDiagram layers={study.diagramLayers} />
							<p className="mt-2 text-xs text-gray-600">
								Flow summary: {study.architectureFlow.join(" → ")}
							</p>
						</div>

						<div className="mt-4">
							<h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
								Before → After
							</h3>
							<div className="space-y-2">
								{study.beforeAfter.map((item) => (
									<div
										key={item.label}
										className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2"
									>
										<p className="text-[11px] uppercase tracking-wide text-gray-500">
											{item.label}
										</p>
										<p className="text-sm text-gray-700">
											<span className="font-medium text-gray-900">Before:</span>{" "}
											{item.before}
										</p>
										<p className="text-sm text-gray-700">
											<span className="font-medium text-emerald-700">
												After:
											</span>{" "}
											{item.after}
										</p>
									</div>
								))}
							</div>
						</div>

						<div className="mt-4 rounded-xl border border-rose-200 bg-rose-50/60 p-4">
							<h3 className="text-xs font-semibold uppercase tracking-widest text-rose-700 mb-2">
								Failure Story
							</h3>
							<p className="text-sm text-rose-900 font-medium">
								{study.failureStory.title}
							</p>
							<div className="mt-2 space-y-1 text-sm text-rose-900/90">
								<p>
									<span className="font-semibold">Symptom:</span>{" "}
									{study.failureStory.symptom}
								</p>
								<p>
									<span className="font-semibold">Root cause:</span>{" "}
									{study.failureStory.rootCause}
								</p>
								<p>
									<span className="font-semibold">Fix:</span>{" "}
									{study.failureStory.fix}
								</p>
								<p>
									<span className="font-semibold">Result:</span>{" "}
									{study.failureStory.result}
								</p>
							</div>
						</div>

						<div className="mt-4">
							<h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
								Choices Made
							</h3>
							<div className="overflow-x-auto rounded-xl border border-gray-200">
								<table className="min-w-full text-sm">
									<thead className="bg-gray-50">
										<tr className="text-left text-gray-600">
											<th className="px-3 py-2 font-semibold">Topic</th>
											<th className="px-3 py-2 font-semibold">Options</th>
											<th className="px-3 py-2 font-semibold">Decision</th>
											<th className="px-3 py-2 font-semibold">Why</th>
										</tr>
									</thead>
									<tbody>
										{study.decisionTable.map((row) => (
											<tr
												key={row.topic}
												className="border-t border-gray-200 text-gray-700 align-top"
											>
												<td className="px-3 py-2 font-medium text-gray-900">
													{row.topic}
												</td>
												<td className="px-3 py-2">{row.options}</td>
												<td className="px-3 py-2">{row.decision}</td>
												<td className="px-3 py-2">{row.why}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>

						<div className="mt-4 grid gap-4 sm:grid-cols-2">
							<div>
								<h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
									Requirements
								</h3>
								<ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
									{study.requirements.map((item) => (
										<li key={item}>{item}</li>
									))}
								</ul>
							</div>
							<div>
								<h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
									What I Did
								</h3>
								<ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
									{study.role.map((item) => (
										<li key={item}>{item}</li>
									))}
								</ul>
							</div>
						</div>

						<div className="mt-4 grid gap-4 sm:grid-cols-2">
							<div>
								<h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
									Downsides
								</h3>
								<ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
									{study.tradeoffs.map((item) => (
										<li key={item}>{item}</li>
									))}
								</ul>
							</div>
							<div>
								<h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
									Notes
								</h3>
								<ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
									{study.notes.map((item) => (
										<li key={item}>{item}</li>
									))}
								</ul>
							</div>
						</div>

						<div className="mt-4 grid gap-4 sm:grid-cols-2">
							<div>
								<h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
									Future Improvements
								</h3>
								<ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
									{study.improvements.map((item) => (
										<li key={item}>{item}</li>
									))}
								</ul>
							</div>
							<div>
								<h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
									Proof Links
								</h3>
								<ul className="space-y-1 text-sm">
									{study.proofLinks.map((item) => {
										const isExternal = item.href.startsWith("http");
										return (
											<li key={item.href}>
												{isExternal ? (
													<a
														href={item.href}
														target="_blank"
														rel="noopener noreferrer"
														className="text-sky-700 hover:underline"
													>
														{item.label} →
													</a>
												) : (
													<Link
														href={item.href}
														className="text-sky-700 hover:underline"
													>
														{item.label} →
													</Link>
												)}
											</li>
										);
									})}
								</ul>
							</div>
						</div>
					</section>
				))}
			</div>
		</div>
	);
}
