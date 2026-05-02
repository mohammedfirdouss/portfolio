import Link from "next/link";

export const metadata = {
	title: "Systems Design",
	description:
		"Evidence-backed systems design case studies from real project repositories, with architecture diagrams, trade-offs, and failure writeups.",
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

const caseStudies = [
	{
		title: "AI Code Reviewer: Edge Review Pipeline",
		projectName: "AI Code Reviewer",
		projectHref: "/projects/AICodeReviewer",
		repoHref: "https://github.com/mohammedfirdouss/ai_code_reviewer",
		context:
			"Built from the ai_code_reviewer repository: Cloudflare Worker routing, Durable Object state, and streaming review responses over WebSocket.",
		problem:
			"Review feedback needed to feel immediate, while still preserving history and controlling abuse in a public-facing endpoint.",
		requirements: [
			"stream review output in real time to the browser",
			"persist review and conversation state per client session",
			"prevent spam and accidental overload with rate limiting",
		],
		impact: [
			{ label: "Review modes", value: "4 (quick, security, performance, docs)" },
			{ label: "Model tier", value: "Workers AI Llama 3.3 70B" },
			{ label: "State bounds", value: "100 reviews / 200 messages cap per agent" },
		],
		role: [
			"Implemented Worker routing for `/agent`, `/api/review`, and operational endpoints.",
			"Used Durable Objects for per-client isolation and persisted review history.",
			"Added language validation guardrails before model execution.",
		],
		architectureFlow: [
			"React frontend",
			"WebSocket or HTTP entry",
			"Worker router + rate limiter",
			"Durable Object agent",
			"Code review service + Workers AI",
			"Streamed result + stored history",
		],
		diagramLayers: [
			{
				label: "Input Layer",
				nodes: ["Code payload", "Selected language", "Review category"],
				tone: "input",
			},
			{
				label: "Processing Layer",
				nodes: ["/agent routing", "Rate limiting", "CORS + API gateway"],
				tone: "process",
			},
			{
				label: "Intelligence Layer",
				nodes: ["Language validation", "CodeReviewService", "Workers AI model"],
				tone: "intelligence",
			},
			{
				label: "Output Layer",
				nodes: ["WebSocket stream chunks", "Saved review list", "Status/analytics endpoints"],
				tone: "output",
			},
		],
		beforeAfter: [
			{
				label: "Response model",
				before: "single full response after processing",
				after: "chunked streaming over WebSocket for faster perceived feedback",
			},
			{
				label: "Session memory",
				before: "stateless request handling",
				after: "Durable Object-backed per-client review/history state",
			},
			{
				label: "Input safety",
				before: "user-declared language only",
				after: "language mismatch checks before review execution",
			},
		],
		failureStory: {
			title: "Language mismatch caused noisy reviews",
			symptom:
				"Submissions with mismatched language selection returned low-signal feedback.",
			rootCause:
				"Review execution trusted declared language without enough validation.",
			fix: "Added language detection + mismatch rejection in the review path before AI call.",
			result:
				"Invalid requests now fail fast with a language error and detected-language hints.",
		},
		decisionTable: [
			{
				topic: "Transport",
				options: "REST polling vs WebSocket streaming",
				decision: "WebSocket streaming",
				why: "Improves perceived latency and supports incremental rendering.",
			},
			{
				topic: "State layer",
				options: "Stateless Worker vs Durable Object",
				decision: "Durable Object",
				why: "Natural fit for per-client history and bounded persistent state.",
			},
			{
				topic: "Language handling",
				options: "Trust user selection vs detect + validate",
				decision: "Detect + validate",
				why: "Prevents avoidable low-quality reviews and bad model context.",
			},
		],
		tradeoffs: [
			"Persistent state helps UX but requires storage bounds and lifecycle management.",
			"Strict language checks improve quality but can reject borderline mixed snippets.",
		],
		notes: [
			"Worker routes expose both real-time and non-streaming modes.",
			"State capping in Durable Objects prevents unbounded growth under repeated usage.",
		],
		improvements: [
			"Expose first-token latency and completion latency as explicit metrics.",
			"Add structured severity scoring in stored review output.",
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
		title: "AWS Analytics Pipeline: S3 → Glue → Athena → QuickSight",
		projectName: "AWS Analytics Pipeline",
		projectHref: "/projects/AWSAnalyticsPipeline",
		repoHref: "https://github.com/mohammedfirdouss/aws-analytics-pipeline-viz",
		context:
			"Built from scripts and journals in aws-analytics-pipeline-viz, including S3 upload automation, Glue crawler setup, Athena queries, and QuickSight setup.",
		problem:
			"Needed a reproducible way to move from raw CSV data to queryable insights and dashboard visuals using mostly serverless AWS services.",
		requirements: [
			"automate data upload and service setup with scripts",
			"catalog schema for SQL querying without manual table maintenance",
			"produce dashboard-ready data flow from the same source bucket",
		],
		impact: [
			{ label: "Dataset", value: "Amazon Sales Dataset (~4.7 MB CSV)" },
			{ label: "Smoke query", value: "Athena `SELECT ... LIMIT 10` execution path" },
			{ label: "Focused analysis", value: "Top 15 filtered rows by product_id + rating" },
		],
		role: [
			"Automated S3 bucket creation and dataset upload via shell script.",
			"Configured Glue database + crawler to infer schema from S3 data.",
			"Ran Athena query paths and connected Athena to QuickSight datasets.",
		],
		architectureFlow: [
			"CSV dataset",
			"S3 upload script",
			"Glue database + crawler",
			"Athena query scripts",
			"QuickSight data source",
			"Dashboards",
		],
		diagramLayers: [
			{
				label: "Input Layer",
				nodes: ["Amazon Sales CSV", "Environment variables", "CLI scripts"],
				tone: "input",
			},
			{
				label: "Processing Layer",
				nodes: ["S3 bucket bootstrap", "Glue DB creation", "Crawler metadata scan"],
				tone: "process",
			},
			{
				label: "Intelligence Layer",
				nodes: ["Athena SQL execution", "Schema-driven queries", "QuickSight dataset setup"],
				tone: "intelligence",
			},
			{
				label: "Output Layer",
				nodes: ["Query result files in S3", "Filtered insights", "Dashboard visuals"],
				tone: "output",
			},
		],
		beforeAfter: [
			{
				label: "Bucket provisioning",
				before: "manual creation attempts with region mismatch errors",
				after: "scripted creation flow with explicit location constraint handling",
			},
			{
				label: "Schema discovery",
				before: "manual assumptions about columns and table shape",
				after: "Glue crawler-created catalog tables for Athena use",
			},
			{
				label: "Analysis mode",
				before: "raw file inspection",
				after: "repeatable SQL queries plus dashboard-ready QuickSight connection",
			},
		],
		failureStory: {
			title: "S3 bucket creation failed with region constraint error",
			symptom: "Bucket creation returned IllegalLocationConstraintException.",
			rootCause:
				"Bucket creation request did not align location constraint with selected AWS region.",
			fix: "Updated the script flow to include explicit location constraint in creation path.",
			result:
				"Bucket creation and dataset upload succeeded, unlocking the downstream pipeline steps.",
		},
		decisionTable: [
			{
				topic: "Data lake location",
				options: "Local files only vs S3-backed source of truth",
				decision: "S3-backed source",
				why: "Needed durable storage compatible with Glue and Athena querying.",
			},
			{
				topic: "Schema strategy",
				options: "Manual table definitions vs Glue crawler metadata",
				decision: "Glue crawler",
				why: "Reduced manual schema setup and matched serverless workflow goals.",
			},
			{
				topic: "QuickSight query mode",
				options: "Direct query vs SPICE import",
				decision: "SPICE for dashboarding path",
				why: "Prioritized responsive interactive visuals for exploration.",
			},
		],
		tradeoffs: [
			"Serverless services reduce ops overhead but can spread debugging context across tools.",
			"CLI automation improves repeatability but requires strict environment variable discipline.",
		],
		notes: [
			"Pipeline proof is split across scripts and service journals rather than one monolithic workflow file.",
			"Athena scripts include both a quick table scan and a targeted product-level query.",
		],
		improvements: [
			"Add scheduled refresh and data-quality assertions for production-like reporting.",
			"Introduce partitioning and parquet conversion to reduce query scan cost.",
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
					Real case studies pulled from my actual repositories, not placeholders.
					Each one includes architecture blocks, before/after changes, an incident
					writeup, and concrete implementation links.
				</p>
			</div>

			<div className="space-y-8">
				{caseStudies.map((study) => (
					<section
						key={study.title}
						className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6"
					>
						<div className="flex flex-wrap items-center gap-2">
							<h2 className="text-xl font-semibold text-gray-900">{study.title}</h2>
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
							<Link href={study.projectHref} className="text-sky-700 hover:underline">
								Open project page →
							</Link>
						</div>

						<div className="mt-4">
							<h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
								Impact Snapshot
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
										<p className="text-sm font-medium text-sky-900">{item.value}</p>
									</div>
								))}
							</div>
						</div>

						<div className="mt-4">
							<h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
								Architecture Flow
							</h3>
							<div className="flex flex-wrap items-center gap-2 text-sm">
								{study.architectureFlow.map((step, index) => (
									<div key={step} className="flex items-center gap-2">
										<span className="rounded border border-gray-200 bg-gray-50 px-2.5 py-1 text-gray-800">
											{step}
										</span>
										{index < study.architectureFlow.length - 1 ? (
											<span className="text-gray-400">→</span>
										) : null}
									</div>
								))}
							</div>
						</div>

						<div className="mt-4">
							<h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
								System Block Diagram
							</h3>
							<div className="rounded-xl border border-gray-200 bg-gray-50/70 p-3 sm:p-4">
								{study.diagramLayers.map((layer, index) => (
									<div key={layer.label}>
										<div
											className={`rounded-lg border p-3 ${layerToneClasses[layer.tone]}`}
										>
											<p className="text-[11px] uppercase tracking-wider text-gray-600">
												{layer.label}
											</p>
											<div className="mt-2 flex flex-wrap gap-2">
												{layer.nodes.map((node) => (
													<span
														key={node}
														className="rounded-md border border-white/80 bg-white/90 px-2 py-1 text-xs text-gray-800"
													>
														{node}
													</span>
												))}
											</div>
										</div>
										{index < study.diagramLayers.length - 1 ? (
											<div className="py-1.5 text-center text-gray-400">↓</div>
										) : null}
									</div>
								))}
							</div>
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
											<span className="font-medium text-emerald-700">After:</span>{" "}
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
								Decision Table
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
									Requirements / Constraints
								</h3>
								<ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
									{study.requirements.map((item) => (
										<li key={item}>{item}</li>
									))}
								</ul>
							</div>
							<div>
								<h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
									Role & Decisions
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
									Key Trade-offs
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
													<Link href={item.href} className="text-sky-700 hover:underline">
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
