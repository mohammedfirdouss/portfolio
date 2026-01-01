import { notFound } from "next/navigation";
import { allDiagrams } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import "../mdx.css";
import { Navigation } from "@/app/components/nav";
import ScrollProgress from "@/app/components/scroll-progress";

interface Props {
	params: { slug: string };
}

export default function DiagramsEntryPage({ params }: Props) {
	const doc = allDiagrams.find((doc) => doc.slug === params.slug);
	if (!doc) notFound();

	return (
		<div className="relative min-h-screen bg-black">
			<Navigation backLink="/diagrams" />

			{/* Background Gradients */}
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
			<div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-zinc-900/50 to-transparent pointer-events-none" />

			<article className="relative z-10 max-w-4xl mx-auto px-6 py-24 md:py-32">
				<header className="mb-12 text-center">
					<div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-zinc-900/50 border border-zinc-800 text-xs font-medium text-emerald-400">
						<span>Interactive Diagram</span>
					</div>
					<h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-6 tracking-tight">
						{doc.title}
					</h1>
					{doc.summary && (
						<p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
							{doc.summary}
						</p>
					)}
				</header>

				<div className="prose prose-zinc prose-invert max-w-none prose-headings:font-display prose-headings:font-semibold prose-p:leading-relaxed prose-img:rounded-xl">
					<Mdx code={doc.body.code} />
				</div>
			</article>
		</div>
	);
}
