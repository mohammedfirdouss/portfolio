import { notFound } from "next/navigation";
import { Mdx } from "@/app/components/mdx";
import "./mdx.css";
import { Navigation } from "@/app/components/nav";
import { Calendar, GitBranch, ArrowLeft, ArrowUpRight } from "lucide-react";
import { allOpenSources } from "contentlayer/generated";
import Link from "next/link";

interface Props {
	params: { slug: string };
}

export async function generateStaticParams(): Promise<Props["params"][]> {
	return allOpenSources.map((entry) => ({
		slug: entry.slug,
	}));
}

export default function OpenSourceEntryPage({ params }: Props) {
	const entry = allOpenSources.find((item) => item.slug === params.slug);

	if (!entry) {
		notFound();
	}

	return (
		<div className="relative min-h-screen bg-black">
			<div className="absolute inset-0 bg-gradient-to-br from-zinc-900/30 via-black to-zinc-900/20" />
			<div className="absolute inset-0 opacity-[0.02] bg-[url('/noise.png')] mix-blend-overlay" />

			<Navigation backLink="/open-source" />

			<div className="relative z-10 px-6 pt-24 mx-auto max-w-3xl md:pt-32 lg:pt-36">
				<div className="flex items-center gap-3 text-zinc-500 mb-4">
					<ArrowLeft className="w-4 h-4" />
					<Link href="/open-source" className="text-sm hover:text-white">
						Back to Open Source
					</Link>
				</div>

				<div className="flex flex-wrap items-center gap-3 mb-6 text-sm text-zinc-500">
					<GitBranch className="w-4 h-4" />
					<span className="uppercase tracking-[0.25em] text-xs">
						Community Contribution
					</span>
					{entry.date && (
						<>
							<span className="w-px h-4 bg-zinc-800" />
							<Calendar className="w-4 h-4" />
							<time dateTime={new Date(entry.date).toISOString()}>
								{new Date(entry.date).toLocaleDateString("en-US", {
									month: "long",
									year: "numeric",
								})}
							</time>
						</>
					)}
				</div>

				<h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-4">
					{entry.title}
				</h1>
				{entry.summary && (
					<p className="text-lg text-zinc-300 mb-6">{entry.summary}</p>
				)}

				<div className="flex flex-wrap items-center gap-3 mb-10">
					{entry.repository && (
						<Link
							href={entry.repository}
							target="_blank"
							className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-zinc-200 transition-colors"
						>
							View Repository <ArrowUpRight className="w-4 h-4" />
						</Link>
					)}
					{entry.url && (
						<Link
							href={entry.url}
							target="_blank"
							className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 text-sm text-zinc-200 hover:border-zinc-600 transition-colors"
						>
							Live Demo <ArrowUpRight className="w-4 h-4" />
						</Link>
					)}
				</div>

				<article className="prose prose-zinc prose-invert max-w-none">
					<Mdx code={entry.body.code} />
				</article>
			</div>

			<div className="h-24" />
		</div>
	);
}
