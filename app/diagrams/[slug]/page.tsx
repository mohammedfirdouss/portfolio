import { notFound } from "next/navigation";
import { Mdx } from "@/app/components/mdx";
import "../mdx.css";
import { Navigation } from "@/app/components/nav";
import ScrollProgress from "@/app/components/scroll-progress";
import { Card } from "@/app/components/card";
import { Calendar, FileImage, ArrowLeft } from "lucide-react";
import { allDiagrams } from "contentlayer/generated";
import Link from "next/link";

interface Props {
	params: { slug: string };
}

export async function generateStaticParams(): Promise<Props["params"][]> {
	return allDiagrams.map((diagram) => ({
		slug: diagram.slug,
	}));
}

export default function DiagramsEntryPage({ params }: Props) {
	const diagram = allDiagrams.find((entry) => entry.slug === params.slug);

	if (!diagram) {
		notFound();
	}

	return (
		<div className="relative min-h-screen bg-black">
			<div className="absolute inset-0 bg-gradient-to-br from-zinc-900/30 via-black to-zinc-900/20" />
			<Navigation backLink="/diagrams" />
			<ScrollProgress />

			<div className="relative z-10 px-6 pt-24 mx-auto max-w-4xl md:pt-32 lg:pt-36">
				<div className="flex items-center gap-3 text-zinc-500 mb-4">
					<ArrowLeft className="w-4 h-4" />
					<Link href="/diagrams" className="text-sm hover:text-white">
						Back to Diagrams
					</Link>
				</div>

				<div className="flex flex-wrap items-center gap-3 mb-6 text-sm text-zinc-500">
					<FileImage className="w-4 h-4" />
					<span className="uppercase tracking-[0.25em] text-xs">
						Architecture Notes
					</span>
					{diagram.date && (
						<>
							<span className="w-px h-4 bg-zinc-800" />
							<Calendar className="w-4 h-4" />
							<time dateTime={new Date(diagram.date).toISOString()}>
								{new Date(diagram.date).toLocaleDateString("en-US", {
									month: "long",
									year: "numeric",
								})}
							</time>
						</>
					)}
				</div>

				<h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-4">
					{diagram.title}
				</h1>
				{diagram.summary && (
					<p className="text-lg text-zinc-300 mb-6">{diagram.summary}</p>
				)}

				<Card>
					<article className="p-6 md:p-10 prose prose-zinc prose-invert max-w-none">
						<Mdx code={diagram.body.code} />
					</article>
				</Card>
			</div>

			<div className="h-24" />
		</div>
	);
}
