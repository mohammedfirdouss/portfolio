"use client";

import Link from "next/link";
import { Mdx } from "../components/mdx";
import { ArrowRight, Calendar } from "lucide-react";

export function Changelog() {
	// Mock changelogs data - replace with real data from your data source
	const changelogs: any[] = [];

	return (
		<section className="relative py-24 border-t border-zinc-800/50">
			<div className="max-w-6xl mx-auto px-6">
				<div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
					<div>
						<h2 className="text-3xl font-bold text-white font-display mb-4">
							What I'm Building
						</h2>
						<p className="text-zinc-400 max-w-lg">
							A live look at what I'm working on, shipping, and learning.
						</p>
					</div>
					<Link
						href="/changelog"
						className="text-sm font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-2"
					>
						View full changelog <ArrowRight className="w-4 h-4" />
					</Link>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{changelogs.map((log) => (
						<div
							key={log._id}
							className="group relative flex flex-col p-6 bg-zinc-900/30 border border-zinc-800/50 rounded-2xl hover:border-zinc-700 transition-all duration-300"
						>
							<div className="flex items-center gap-2 text-xs text-zinc-500 mb-4">
								<Calendar className="w-3 h-3" />
								<time dateTime={log.date}>
									{new Date(log.date).toLocaleDateString("en-US", {
										month: "long",
										day: "numeric",
										year: "numeric",
									})}
								</time>
							</div>

							<h3 className="text-lg font-semibold text-zinc-200 group-hover:text-white mb-2 transition-colors">
								{log.title}
							</h3>

							<div className="text-sm text-zinc-400 line-clamp-3">
								<Mdx code={log.body.code} />
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
