import React from "react";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { DiagramArticle } from "./article";
import { getRedis } from "@/util/redis";
import { FileImage } from "lucide-react";
import { allDiagrams } from "contentlayer/generated";

export const metadata = {
	title: "Diagrams",
	description:
		"Visual breakdowns of cloud architectures, system designs, and infrastructure patterns.",
};

export const revalidate = 60;
export default async function DiagramsPage() {
	const diagrams = allDiagrams
		.filter((diagram) => diagram.published !== false)
		.sort(
			(a, b) =>
				new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
				new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
		);

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

			<div className="relative z-10 px-6 pt-24 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-12 md:pt-32 lg:pt-40">
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
						Visual breakdowns of cloud architectures, system designs, and
						infrastructure patterns.
					</p>
				</div>

				{/* Divider */}
				<div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

				{/* All diagrams */}
				{diagrams.length > 0 ? (
					<div className="grid grid-cols-1 gap-6 mx-auto lg:mx-0 md:grid-cols-2 lg:grid-cols-3 pb-8">
						{diagrams.map((diagram: any) => (
							<Card key={diagram.slug}>
								<DiagramArticle
									entry={diagram}
									views={views[diagram.slug] ?? 0}
								/>
							</Card>
						))}
					</div>
				) : (
					<div className="text-center py-12">
						<p className="text-zinc-400">Diagrams coming soon.</p>
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
