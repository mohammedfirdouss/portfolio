import Link from "next/link";
import { allDiagrams } from "contentlayer/generated";

export const metadata = {
	title: "Diagrams",
	description:
		"Architecture diagrams for cloud infrastructure projects — AWS, Kubernetes, and serverless systems.",
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
			<div className="text-lg text-gray-700 mb-12">
				<p>
					Architecture diagrams for projects I've built — useful for
					understanding how the pieces fit together.
				</p>
			</div>
			<div className="space-y-8">
				{diagrams.map((diagram) => (
					<Link
						key={diagram.slug}
						href={`/diagrams/${diagram.slug}`}
						className="block group"
					>
						{diagram.screenshot && (
							<div className="mb-3 overflow-hidden rounded-lg border border-gray-100">
								<img
									src={diagram.screenshot}
									alt={diagram.title}
									className="w-full h-40 object-cover object-top group-hover:opacity-90 transition-opacity"
								/>
							</div>
						)}
						<div className="flex items-baseline gap-3 flex-wrap">
							<span className="text-lg font-semibold text-gray-900 group-hover:text-sky-600 transition-colors">
								{diagram.title}
							</span>
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
						<span className="inline-block mt-2 text-sm text-sky-600 group-hover:underline">
							View diagram →
						</span>
					</Link>
				))}
			</div>
		</div>
	);
}
