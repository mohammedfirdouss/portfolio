import React from "react";
import { allProjects } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";
import { getRedis } from "@/util/redis";
import { Sparkles } from "lucide-react";

export const metadata = {
	title: "Projects",
	description:
		"Cloud infrastructure, AI systems, and automation projects — from prototype to production.",
};

export const revalidate = 60;
export default async function ProjectsPage() {
	const projects = allProjects
		.filter((p) => p.published)
		.sort(
			(a, b) =>
				new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
				new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
		);

	const slugsToFetch = projects.map((p) => p.slug);

	const redis = getRedis();
	let viewCounts: (number | null)[] = [];

	if (redis && slugsToFetch.length) {
		try {
			viewCounts = (await redis.mget(
				...slugsToFetch.map((slug) =>
					["pageviews", "projects", slug].join(":"),
				),
			)) as (number | null)[];
		} catch (e) {
			console.warn("Failed to fetch view counts:", e);
		}
	}

	const views: Record<string, number> = {};
	slugsToFetch.forEach((slug, i) => {
		views[slug] = viewCounts[i] ?? 0;
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
			<div className="absolute top-0 left-1/4 w-[800px] h-[600px] bg-gradient-radial from-zinc-800/20 via-transparent to-transparent rounded-full blur-3xl" />

			<Navigation />

			<div className="relative z-10 px-6 pt-24 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-12 md:pt-32 lg:pt-40">
				{/* Header */}
				<div className="max-w-2xl mx-auto lg:mx-0">
					<div className="h-px w-16 bg-gradient-to-r from-zinc-500 to-transparent mb-8" />
					<div className="flex items-center gap-3 mb-4">
						<Sparkles className="w-5 h-5 text-zinc-500" />
						<span className="text-sm font-medium tracking-widest uppercase text-zinc-500">
							Portfolio
						</span>
					</div>
					<h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl font-display">
						Projects
					</h1>
					<p className="mt-6 text-lg text-zinc-300 leading-relaxed">
						Cloud infrastructure, AI systems, and automation — from prototype to
						production.
					</p>
				</div>

				{/* Divider */}
				<div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

				{/* All projects */}
				{projects.length > 0 ? (
					<div className="grid grid-cols-1 gap-8 mx-auto lg:mx-0 md:grid-cols-2 lg:grid-cols-3 items-start pb-8">
						{projects.map((project: any) => (
							<Card key={project.slug}>
								<Article project={project} views={views[project.slug] ?? 0} />
							</Card>
						))}
					</div>
				) : (
					<div className="text-center py-12">
						<p className="text-zinc-400">Projects coming soon.</p>
					</div>
				)}
			</div>

			{/* Bottom padding */}
			<div className="h-32" />

			{/* Corner decorations */}
			<div className="absolute top-24 left-8 w-24 h-24 border-l border-t border-zinc-800/50 rounded-tl-3xl" />
			<div className="absolute top-24 right-8 w-24 h-24 border-r border-t border-zinc-800/50 rounded-tr-3xl" />
		</div>
	);
}
