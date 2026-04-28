import Link from "next/link";
import { allOpenSources } from "contentlayer/generated";

export const metadata = {
	title: "Open Source",
	description:
		"Contributions to open source projects — bug fixes, documentation, features, and mentorship through programs like LFX.",
};

const projectColors: Record<string, string> = {
	PipeCD: "text-sky-600 border-sky-200 bg-sky-50",
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
			<h1 className="font-display text-8xl text-gray-200 mb-8">open source</h1>
			<div className="text-lg text-gray-700 mb-12">
				<p>I contribute where I can — mostly CNCF and cloud-native projects.</p>
			</div>

			{featured.length > 0 && (
				<div className="mb-12">
					<h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">
						Notable contributions
					</h2>
					<div className="space-y-6">
						{featured.map((contrib) => (
							<ContributionRow key={contrib.slug} contrib={contrib} />
						))}
					</div>
				</div>
			)}

			{rest.length > 0 && (
				<div>
					<h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">
						All contributions
					</h2>
					<div className="space-y-6">
						{rest.map((contrib) => (
							<ContributionRow key={contrib.slug} contrib={contrib} />
						))}
					</div>
				</div>
			)}
		</div>
	);
}

function ContributionRow({ contrib }: { contrib: any }) {
	const badgeClass =
		contrib.project && projectColors[contrib.project]
			? projectColors[contrib.project]
			: "text-gray-500 border-gray-200 bg-gray-50";

	return (
		<Link href={`/open-source/${contrib.slug}`} className="block group">
			<div className="flex items-baseline gap-3 flex-wrap">
				<span className="text-lg font-semibold text-gray-900 group-hover:text-sky-600 transition-colors">
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
						<span className="text-sm text-gray-400">
							{new Date(contrib.date).toLocaleDateString("en-us", {
								year: "numeric",
								month: "short",
							})}
						</span>
					)}
				</div>
			</div>
			{contrib.summary && (
				<p className="text-gray-500 mt-1">{contrib.summary}</p>
			)}
			<span className="inline-block mt-2 text-sm text-sky-600 group-hover:underline">
				Read more →
			</span>
		</Link>
	);
}
