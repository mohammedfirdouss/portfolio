import Link from "next/link";
import React from "react";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { DiagramArticle } from "./article";
import { getRedis } from "@/util/redis";
import { Eye, ArrowRight, FileImage } from "lucide-react";
import { allDiagrams } from "contentlayer/generated";

export const revalidate = 60;
export default async function DiagramsPage() {
	const diagrams = allDiagrams
		.filter((diagram) => diagram.published !== false)
		.sort(
			(a, b) =>
				new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
				new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
		);

	const featured = diagrams[0];
	const [top2, top3] = diagrams.slice(1, 3);
	const sorted = diagrams.slice(3);

	const slugsToFetch = diagrams.map((diagram) => diagram.slug);
	const redis = getRedis();
	let viewCounts: (number | null)[] = [];

	if (redis && slugsToFetch.length) {
		try {
			viewCounts = (await redis.mget(
				...slugsToFetch.map((slug) =>
					["pageviews", "diagrams", slug].join(":"),
				),
			)) as (number | null)[];
		} catch (e) {
			console.warn("Failed to fetch diagram view counts:", e);
		}
	}

	const views: Record<string, number> = {};
	slugsToFetch.forEach((slug, index) => {
		views[slug] = viewCounts[index] ?? 0;
	});

	return (
		<div className="relative min-h-screen bg-black">
			{/* Background effects */}
			<div className="absolute inset-0 bg-gradient-to-br from-zinc-900/30 via-black to-zinc-900/20" />
			<div
				className="absolute inset-0 opacity-[0.02]"
				style={{
					backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
					backgroundSize: "80px 80px",
				}}
			/>

			{/* Radial glow */}
			<div className="absolute top-0 right-1/3 w-[800px] h-[600px] bg-gradient-radial from-zinc-800/20 via-transparent to-transparent rounded-full blur-3xl" />

			<Navigation />

			<div className="relative z-10 px-6 pt-24 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-32 lg:pt-40">
				{/* Header */}
				<div className="max-w-2xl mx-auto lg:mx-0">
					<div className="h-px w-16 bg-gradient-to-r from-zinc-500 to-transparent mb-8" />
					<div className="flex items-center gap-3 mb-4">
						<FileImage className="w-5 h-5 text-zinc-500" />
						<span className="text-sm font-medium tracking-widest uppercase text-zinc-500">
							Visual Documentation
						</span>
					</div>
					<h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl font-display">
						Diagrams
					</h1>
					<p className="mt-6 text-lg text-zinc-400 leading-relaxed">
						Architecture designs, system flows, and infrastructure
						documentation.
					</p>
				</div>

				{/* Divider */}
				<div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

			{/* Featured diagram - Empty state */}
			{featured ? (
				<div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2">
					<Card>
						<Link
							href={`/diagrams/${featured.slug}`}
							data-cursor="pointer"
							data-cursor-text="View"
						>
							<article className="relative w-full h-full p-6 md:p-10">
								{/* Featured badge */}
								<div className="absolute top-6 right-6 md:top-10 md:right-10">
									<span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-zinc-400 border border-zinc-800 rounded-full bg-zinc-900/50">
										<span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
										Featured
									</span>
								</div>

								<div className="flex items-center justify-between gap-2 mb-4">
									<div className="text-xs text-zinc-500">
										{featured.date ? (
											<time dateTime={new Date(featured.date).toISOString()}>
												{Intl.DateTimeFormat("en-US", {
													dateStyle: "medium",
												}).format(new Date(featured.date))}
											</time>
										) : (
											<span />
										)}
									</div>
									<span className="flex items-center gap-1.5 text-xs text-zinc-500">
										<Eye className="w-4 h-4" />{" "}
										{Intl.NumberFormat("en-US", { notation: "compact" }).format(
											views[featured.slug] ?? 0,
										)}
									</span>
								</div>

								<h2
									id="featured-post"
									className="mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display transition-colors duration-300"
								>
									{featured.title}
								</h2>
								<p className="mt-4 leading-7 text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300 line-clamp-3">
									{featured.summary}
								</p>
								<div className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-400 group-hover:text-white transition-colors duration-300">
									View diagram
									<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
								</div>
							</article>
						</Link>
					</Card>

					<div className="flex flex-col w-full gap-6 mx-auto lg:mx-0">
						{[top2, top3].filter(Boolean).map((diagram: any) => (
							<Card key={diagram.slug}>
								<DiagramArticle
									entry={diagram}
									views={views[diagram.slug] ?? 0}
								/>
							</Card>
						))}
					</div>
				</div>
			) : (
				<div className="text-center py-12">
					<p className="text-zinc-400">Diagrams data coming soon</p>
				</div>
			)}

			{/* Divider */}
			{sorted.length > 0 && (
				<div className="hidden w-full h-px md:block bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
			)}

			{/* Other diagrams */}
			{sorted.length > 0 && (
				<div className="grid grid-cols-1 gap-6 mx-auto lg:mx-0 md:grid-cols-2 lg:grid-cols-3">
					{sorted.map((diagram: any) => (
						<Card key={diagram.slug}>
							<DiagramArticle
								entry={diagram}
								views={views[diagram.slug] ?? 0}
							/>
						</Card>
					))}
				</div>
			)}
			</div>

			{/* Bottom padding */}
			<div className="h-24" />

			{/* Corner decorations */}
			<div className="absolute top-24 left-8 w-24 h-24 border-l border-t border-zinc-800/50 rounded-tl-3xl" />
			<div className="absolute top-24 right-8 w-24 h-24 border-r border-t border-zinc-800/50 rounded-tr-3xl" />
		</div>
	);
}
