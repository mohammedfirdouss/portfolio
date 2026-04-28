import Link from "next/link";

export const metadata = {
	title: "Systems Design",
	description:
		"Two practical systems design cases with measurable outcomes, architecture choices, trade-offs, and implementation notes.",
};

const caseStudies = [
	{
		title: "Pull Request Review Queue",
		problem:
			"Engineers needed fast feedback on pull requests, but synchronous checks were slowing merges.",
		requirements: [
			"keep average feedback time under 2 minutes",
			"handle release-day spikes without dropping jobs",
			"keep a clear audit trail for every review comment",
		],
		impact: [
			{ label: "Feedback SLA", value: "< 2 minutes average" },
			{ label: "Durability goal", value: "0 dropped jobs during spikes" },
			{ label: "Auditability", value: "100% traceable review comments" },
		],
		role: [
			"Designed queue topology and worker concurrency boundaries.",
			"Introduced repository-priority lanes to reduce merge-day tail latency.",
			"Defined retry strategy for oversized diffs to protect feedback SLA.",
		],
		architectureFlow: [
			"Git webhooks",
			"Job queue",
			"Worker pool",
			"Rules + model service",
			"Review results store",
		],
		tradeoffs: [
			"Queueing improved reliability, but users lost instant responses",
			"Shared worker pools improved utilization, but noisy repos affected tail latency",
		],
		notes: [
			"Most delays came from retries on very large diffs, not model latency.",
			"Separate queues per repository priority reduced merge-day complaints.",
		],
		improvements: [
			"Add diff-size based routing to dedicated workers",
			"Cache repeated review hints for common file patterns",
		],
		proofLinks: [
			{ label: "Related project", href: "/projects/AICodeReviewer" },
			{ label: "Implementation notes", href: "/blog/mcps-and-apis" },
		],
	},
	{
		title: "Tenant Analytics Pipeline",
		problem:
			"Product and support teams needed daily reports plus near real-time usage visibility per tenant.",
		requirements: [
			"strict tenant-level data isolation",
			"cheap long-term storage for raw events",
			"dashboard freshness within one hour",
		],
		impact: [
			{ label: "Dashboard freshness target", value: "< 1 hour" },
			{ label: "Storage strategy", value: "low-cost raw event retention" },
			{
				label: "Isolation requirement",
				value: "tenant-level boundaries by design",
			},
		],
		role: [
			"Designed ingestion-to-mart flow for daily and near real-time reporting.",
			"Set partition and processing profiles to avoid tenant cost imbalance.",
			"Added schema-governance guardrails to reduce dashboard breakage risk.",
		],
		architectureFlow: [
			"Client events",
			"Ingestion API",
			"Stream bus",
			"ETL jobs",
			"Warehouse marts",
			"Dashboards",
		],
		tradeoffs: [
			"Shared stream topics cut cost, but partition mistakes became risky",
			"Hourly batch jobs were simple, but incident analysis felt delayed",
		],
		notes: [
			"Schema drift broke charts more often than pipeline failures.",
			"Small tenants overpaid when using the same processing profile as large tenants.",
		],
		improvements: [
			"Move top KPIs to incremental processing",
			"Add producer contract tests to catch schema drift early",
		],
		proofLinks: [
			{ label: "Related project", href: "/projects/AWSAnalyticsPipeline" },
			{
				label: "Implementation notes",
				href: "/blog/navigating-aws-with-confidence",
			},
		],
	},
];

export default function SystemsDesignPage() {
	return (
		<div>
			<h1 className="font-display text-5xl sm:text-6xl md:text-7xl xl:text-8xl text-gray-200 mb-8">
				systems design
			</h1>
			<div className="text-lg text-gray-700 mb-12 max-w-3xl">
				<p>
					Two practical system design cases with constraints, measurable
					targets, trade-offs, and implementation decisions.
				</p>
			</div>

			<div className="space-y-8">
				{caseStudies.map((study) => (
					<section
						key={study.title}
						className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6"
					>
						<h2 className="text-xl font-semibold text-gray-900">
							{study.title}
						</h2>
						<p className="mt-3 text-gray-700">
							<span className="font-medium text-gray-900">Problem:</span>{" "}
							{study.problem}
						</p>

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
										<p className="text-sm font-medium text-sky-900">
											{item.value}
										</p>
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
									{study.proofLinks.map((item) => (
										<li key={item.href}>
											<Link
												href={item.href}
												className="text-sky-700 hover:underline"
											>
												{item.label} →
											</Link>
										</li>
									))}
								</ul>
							</div>
						</div>
					</section>
				))}
			</div>
		</div>
	);
}
