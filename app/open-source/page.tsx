import Link from "next/link";
import { allOpenSources, type OpenSource } from "contentlayer/generated";

export const metadata = {
	title: "Open Source",
	description:
		"Contributions to open source projects, bug fixes, documentation, features, and mentorship through programs like LFX.",
};

const projectColors: Record<string, string> = {
	PipeCD: "text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950",
	GitLab: "text-orange-600 border-orange-200 bg-orange-50",
};

export default function OpenSourcePage() {
	const contributions = allOpenSources
		.filter((c) => c.published !== false)
		.sort(
			(a, b) =>
				new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime(),
		);

	const featured = contributions.filter((c) => c.featured);
	const rest = contributions.filter((c) => !c.featured);

	return (
		<div>
			<h1 className="page-title">open source</h1>
			<div className="text-lg text-[color:var(--fg)] mb-12">
				<p>I contribute where I can, mostly CNCF and cloud-native projects.</p>
			</div>

			{featured.length > 0 && (
				<div className="mb-12">
					<h2 className="text-xs font-semibold uppercase tracking-widest text-[color:var(--muted)] mb-6">
						Notable contributions
					</h2>
					<div className="divide-y divide-[color:var(--rule)]">
						{featured.map((contrib) => (
							<div key={contrib.slug} className="pt-6 first:pt-0">
								<ContributionRow contrib={contrib} />
							</div>
						))}
					</div>
				</div>
			)}

			{rest.length > 0 && (
				<div>
					<h2 className="text-xs font-semibold uppercase tracking-widest text-[color:var(--muted)] mb-6">
						All contributions
					</h2>
					<div className="divide-y divide-[color:var(--rule)]">
						{rest.map((contrib) => (
							<div key={contrib.slug} className="pt-6 first:pt-0">
								<ContributionRow contrib={contrib} />
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

function ContributionRow({ contrib }: { contrib: OpenSource }) {
	const badgeClass =
		contrib.project && projectColors[contrib.project]
			? projectColors[contrib.project]
			: "text-[color:var(--muted)] border-[color:var(--rule)]";

	return (
		<Link href={`/open-source/${contrib.slug}`} className="block group">
			<div className="flex items-baseline gap-3 flex-wrap">
				<span className="text-lg font-semibold text-[color:var(--fg)] group-hover:text-sky-600 group-hover:dark:text-sky-400 transition-colors">
					{contrib.title}
				</span>
				<div className="flex items-center gap-2">
					{contrib.project && (
						<span
							className={`inline-flex items-center px-2 py-px text-xs border rounded-full ${badgeClass}`}
						>
							{contrib.project}
						</span>
					)}
					{contrib.date && (
						<span className="text-sm text-[color:var(--muted)]">
							{new Date(contrib.date).toLocaleDateString("en-us", {
								year: "numeric",
								month: "short",
							})}
						</span>
					)}
				</div>
			</div>
		</Link>
	);
}
