import Link from "next/link";
import { allDiagrams } from "contentlayer/generated";

export const metadata = {
	title: "Diagrams",
};

export default function DiagramsPage() {
	const diagrams = allDiagrams
		.filter((d) => d.published !== false)
		.sort(
			(a, b) =>
				new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime(),
		);

	return (
		<div>
			<h1 className="font-display text-8xl text-gray-200 mb-8">diagrams</h1>
			<div className="space-y-6">
				{diagrams.map((diagram) => (
					<div key={diagram.slug}>
						<div className="flex items-baseline gap-4">
							<Link
								href={`/diagrams/${diagram.slug}`}
								className="text-lg font-semibold text-gray-900 hover:text-sky-600 transition-colors"
							>
								{diagram.title}
							</Link>
							{diagram.date && (
								<span className="text-sm text-gray-400">
									{new Date(diagram.date).toLocaleDateString("en-us", {
										year: "numeric",
										month: "short",
									})}
								</span>
							)}
						</div>
						{diagram.summary && (
							<p className="text-gray-500 mt-1">{diagram.summary}</p>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
