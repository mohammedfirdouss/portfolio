import Link from "next/link";
import { allOpenSources } from "contentlayer/generated";

export const metadata = {
	title: "Open Source",
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
			<div className="space-y-6">
				{contributions.map((contrib) => (
					<div key={contrib.slug}>
						<div className="flex items-baseline gap-4">
							<Link
								href={`/open-source/${contrib.slug}`}
								className="text-lg font-semibold text-gray-900 hover:text-sky-600 transition-colors"
							>
								{contrib.title}
							</Link>
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
					</div>
				))}
			</div>
		</div>
	);
}
