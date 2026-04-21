export const metadata = {
	title: "Systems Design",
	description:
		"Two practical systems design cases with requirements, architecture, trade-offs, notes, and next steps.",
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
		architecture:
			"Git webhooks → job queue → worker pool → rules + model service → review results store",
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
		architecture:
			"Client events → ingestion API → stream bus → ETL jobs → warehouse marts → dashboards",
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
	},
];

export default function SystemsDesignPage() {
	return (
		<div>
			<h1 className="font-display text-8xl text-gray-200 mb-8">systems design</h1>
			<div className="text-lg text-gray-700 mb-12 max-w-2xl">
				<p>
					Two short system design cases with practical constraints, trade-offs,
					and implementation notes.
				</p>
			</div>

			<div className="space-y-8">
				{caseStudies.map((study) => (
					<section
						key={study.title}
						className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6"
					>
						<h2 className="text-xl font-semibold text-gray-900">{study.title}</h2>
						<p className="mt-3 text-gray-700">
							<span className="font-medium text-gray-900">Problem:</span>{" "}
							{study.problem}
						</p>
						<div className="mt-4 grid gap-4 sm:grid-cols-2">
							<div>
								<h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
									Requirements / Constraints
								</h3>
								<ul className="space-y-1 text-sm text-gray-600">
									{study.requirements.map((item) => (
										<li key={item}>• {item}</li>
									))}
								</ul>
							</div>
							<div>
								<h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
									High-level Architecture
								</h3>
								<div className="rounded-lg border border-dashed border-sky-200 bg-sky-50 px-3 py-2 text-sm text-sky-900">
									{study.architecture}
								</div>
							</div>
						</div>
						<div className="mt-4 grid gap-4 sm:grid-cols-2">
							<div>
								<h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
									Key Trade-offs
								</h3>
								<ul className="space-y-1 text-sm text-gray-600">
									{study.tradeoffs.map((item) => (
										<li key={item}>• {item}</li>
									))}
								</ul>
							</div>
							<div>
								<h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
									Notes
								</h3>
								<ul className="space-y-1 text-sm text-gray-600">
									{study.notes.map((item) => (
										<li key={item}>• {item}</li>
									))}
								</ul>
							</div>
						</div>
						<div className="mt-4">
							<div>
								<h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
									Future Improvements
								</h3>
								<ul className="space-y-1 text-sm text-gray-600">
									{study.improvements.map((item) => (
										<li key={item}>• {item}</li>
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
