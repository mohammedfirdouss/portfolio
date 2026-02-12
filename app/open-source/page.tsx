import { OpenSourceArticle } from "./article";
import { Card } from "../components/card";
import { Navigation } from "../components/nav";
import { GitBranch, Sparkles } from "lucide-react";
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
			<div className="absolute top-0 left-1/3 w-[800px] h-[600px] bg-gradient-radial from-zinc-800/20 via-transparent to-transparent rounded-full blur-3xl" />

			<Navigation />

			<div className="relative z-10 px-6 pt-24 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-32 lg:pt-40">
				{/* Header */}
				<div className="max-w-2xl mx-auto lg:mx-0">
					<div className="h-px w-16 bg-gradient-to-r from-zinc-500 to-transparent mb-8" />
					<div className="flex items-center gap-3 mb-4">
						<GitBranch className="w-5 h-5 text-zinc-300" />
						<span className="text-sm font-medium tracking-widest uppercase text-zinc-300">
							Community Contributions
						</span>
					</div>
					<h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl font-display">
						Open Source
					</h1>
					<p className="mt-6 text-lg text-zinc-400 leading-relaxed">
						Giving back to the community through code, documentation, and
						collaboration.
					</p>
				</div>

				{/* Divider */}
				<div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

				{/* Featured entry */}
				{featured && (
					<div className="relative">
						<div className="absolute -top-4 left-0">
							<span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-zinc-400 border border-zinc-800 rounded-full bg-zinc-900/50">
								<Sparkles className="w-3 h-3" />
								Featured
							</span>
						</div>
						<Card>
							<OpenSourceArticle entry={featured} views={0} featured />
						</Card>
					</div>
				)}

				{!featured && (
					<div className="text-center text-zinc-400">
						Open-source highlights coming soon.
					</div>
				)}

				{/* Divider */}
				{rest.length > 0 && (
					<div className="hidden w-full h-px md:block bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
				)}

				{/* Other entries */}
				<div className="grid grid-cols-1 gap-6 mx-auto lg:grid-cols-2">
					{rest.map((entry) => (
						<Card key={entry._id}>
							<OpenSourceArticle entry={entry} views={0} />
						</Card>
					))}
				</div>
			</div>

			{/* Bottom padding */}
			<div className="h-24" />

			{/* Corner decorations */}
			<div className="absolute top-24 left-8 w-24 h-24 border-l border-t border-zinc-800/50 rounded-tl-3xl" />
			<div className="absolute top-24 right-8 w-24 h-24 border-r border-t border-zinc-800/50 rounded-tr-3xl" />
		</div>
	);
}
