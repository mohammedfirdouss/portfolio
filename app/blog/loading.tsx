import { Navigation } from "../components/nav";

export default function BlogLoading() {
	return (
		<div className="relative min-h-screen bg-black">
			<Navigation />

			<div className="relative z-10 px-6 pt-24 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-12 md:pt-32 lg:pt-40">
				{/* Header skeleton */}
				<div className="max-w-2xl mx-auto lg:mx-0">
					<div className="h-px w-16 bg-zinc-800 mb-8" />
					<div className="flex items-center gap-3 mb-4">
						<div className="w-5 h-5 rounded bg-zinc-800/50 animate-pulse" />
						<div className="h-3 w-28 bg-zinc-800/50 rounded animate-pulse" />
					</div>
					<div className="h-12 bg-zinc-800/40 rounded-lg w-32 animate-pulse" />
					<div className="h-5 bg-zinc-800/30 rounded w-full mt-6 animate-pulse" />
					<div className="h-5 bg-zinc-800/30 rounded w-2/3 mt-2 animate-pulse" />
				</div>

				{/* Divider */}
				<div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

				{/* Grid skeleton */}
				<div className="grid grid-cols-1 gap-6 mx-auto lg:grid-cols-2 xl:grid-cols-3">
					{[...Array(6)].map((_, i) => (
						<div
							key={i}
							className="border border-zinc-800/50 rounded-2xl p-6 animate-pulse"
						>
							<div className="flex justify-between mb-4">
								<div className="h-3 w-24 bg-zinc-800/40 rounded" />
								<div className="h-3 w-16 bg-zinc-800/40 rounded" />
							</div>
							<div className="h-6 w-3/4 bg-zinc-800/40 rounded mb-3" />
							<div className="h-4 w-full bg-zinc-800/30 rounded mb-2" />
							<div className="h-4 w-2/3 bg-zinc-800/30 rounded" />
							<div className="pt-4 mt-4 border-t border-zinc-800/30">
								<div className="h-3 w-20 bg-zinc-800/40 rounded" />
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="h-24" />
		</div>
	);
}
