import { OpenSourceArticle } from "./article";
import { Card } from "../components/card";
import { Navigation } from "../components/nav";
import { GitBranch } from "lucide-react";
import { allOpenSources } from "contentlayer/generated";

export default function OpenSourcePage() {
	const openSourceEntries = allOpenSources
		.filter((entry) => entry.published !== false)
		.sort(
			(a, b) =>
				new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
				new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
		);

	// Get featured entry (first one) and rest
	const featured = openSourceEntries[0];
	const rest = openSourceEntries.slice(1);

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

			<div className="relative z-10 px-6 pt-24 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-32 lg:pt-40">
				{/* Header */}
				<div className="max-w-2xl mx-auto lg:mx-0">
					<div className="h-px w-16 bg-gradient-to-r from-zinc-500 to-transparent mb-8" />
					<div className="flex items-center gap-3 mb-4">
						<GitBranch className="w-5 h-5 text-zinc-500" />
						<span className="text-sm font-medium tracking-widest uppercase text-zinc-500">
							Community Contributions
						</span>
					</div>
					<h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl font-display">
						Open Source
					</h1>
					<p className="mt-6 text-lg text-zinc-300 leading-relaxed">
						Giving back to the community through code, documentation, and
						collaboration.
					</p>
				</div>

				{/* Divider */}
				<div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

				{/* Featured entry */}
				{featured ? (
					<div className="relative pt-6">
						<div className="mb-4">
							<span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-white border border-zinc-500/50 rounded-full bg-zinc-900/80 backdrop-blur-md shadow-lg">
								<span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
								Featured
							</span>
						</div>
						<Card>
							<OpenSourceArticle entry={featured} views={0} featured />
						</Card>
					</div>
				) : (
					<div className="text-center py-12">
						<p className="text-zinc-400">Open-source highlights coming soon.</p>
					</div>
				)}

				{/* Divider */}
				{rest.length > 0 && (
					<div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
				)}

				{/* Other entries */}
				{rest.length > 0 && (
					<div className="grid grid-cols-1 gap-8 mx-auto lg:mx-0 md:grid-cols-2 items-start pt-4 pb-8">
						{rest.map((entry) => (
							<Card key={entry._id}>
								<OpenSourceArticle entry={entry} views={0} />
							</Card>
						))}
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
