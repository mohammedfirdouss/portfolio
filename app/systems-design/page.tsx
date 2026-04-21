export const metadata = {
	title: "Systems Design",
	description:
		"Concise systems design case studies covering requirements, architecture, trade-offs, and future improvements.",
};

const caseStudies = [
	{
		title: "Real-time AI Code Review Platform",
		problem:
			"Teams need near-instant pull request feedback without slowing delivery.",
		requirements: [
			"p95 response under 2 seconds for common checks",
			"support burst traffic during release windows",
			"auditability of comments and decisions",
		],
		architecture:
			"Git provider webhooks → queue → stateless workers → policy engine + LLM gateway → persistent review store",
		tradeoffs: [
			"Queued async processing improves reliability but adds eventual consistency",
			"Centralized policy engine improves governance but increases coupling",
		],
		improvements: [
			"Introduce adaptive model routing based on repository risk profile",
			"Add semantic caching for repeated file patterns",
		],
	},
	{
		title: "Multi-tenant Analytics Pipeline",
		problem:
			"Product teams need daily and near-real-time usage metrics across tenants.",
		requirements: [
			"tenant isolation for data and compute",
			"low-cost storage for raw events",
			"hourly freshness for operational dashboards",
		],
		architecture:
			"SDK events → ingestion API → stream buffer → ETL jobs → warehouse marts → BI dashboards",
		tradeoffs: [
			"Shared stream reduces cost but requires strict partition controls",
			"Batch ETL is cheaper than full streaming but lowers freshness",
		],
		improvements: [
			"Move critical metrics to incremental processing",
			"Automate schema drift detection with contract checks",
		],
	},
	{
		title: "Global API for Portfolio Services",
		problem:
			"Public endpoints must stay fast and available across regions during spikes.",
		requirements: [
			"99.9% availability target",
			"global read latency under 250ms",
			"secure edge authentication and rate limiting",
		],
		architecture:
			"Anycast CDN + WAF → API gateway → regional services → replicated datastore + cache",
		tradeoffs: [
			"Multi-region replication improves resilience but raises write complexity",
			"Aggressive caching lowers latency but increases invalidation overhead",
		],
		improvements: [
			"Add chaos drills for region failover confidence",
			"Implement cost-aware auto-scaling policies",
		],
	},
];

export default function SystemsDesignPage() {
	return (
		<div>
			<h1 className="font-display text-8xl text-gray-200 mb-8">systems design</h1>
			<div className="text-lg text-gray-700 mb-12 max-w-2xl">
				<p>
					Short architecture case studies that show how I think about
					requirements, constraints, and trade-offs at system level.
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
