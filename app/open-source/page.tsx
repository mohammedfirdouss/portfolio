import Link from "next/link";
import { allOpenSources } from "contentlayer/generated";

export const metadata = {
	title: "Open Source",
	description:
		"Contributions to open source projects — bug fixes, documentation, features, and mentorship through programs like LFX.",
};

export default function OpenSourcePage() {
	const contributions = allOpenSources
		.filter((c) => c.published !== false)
		.sort(
			(a, b) =>
				new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime(),
		);

	return (
		<div>
			<h1 className="font-display text-8xl text-gray-200 mb-8">
				open source
			</h1>
			<div className="text-lg text-gray-700 mb-12">
				<p>
					Contributions to open source projects — mostly around cloud-native tooling and CNCF projects. Some through the LFX Mentorship program, others just because the project was interesting.
				</p>
			</div>
			<div className="space-y-6">
				{contributions.map((contrib) => (
					<Link
						key={contrib.slug}
						href={`/open-source/${contrib.slug}`}
						className="block group"
					>
						<div className="flex items-baseline gap-4">
							<span className="text-lg font-semibold text-gray-900 group-hover:text-sky-600 transition-colors">
								{contrib.title}
							</span>
							{contrib.date && (
								<span className="text-sm text-gray-400">
									{new Date(contrib.date).toLocaleDateString("en-us", {
										year: "numeric",
										month: "short",
									})}
								</span>
							)}
						</div>
						{contrib.summary && (
							<p className="text-gray-500 mt-1">{contrib.summary}</p>
						)}
						<span className="inline-block mt-2 text-sm text-sky-600 group-hover:underline">
							Read more →
						</span>
					</Link>
				))}
			</div>
		</div>
	);
}
