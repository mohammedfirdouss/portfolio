import { Navigation } from "../components/nav";

export default function ExperienceLoading() {
	return (
		<div className="relative min-h-screen bg-black">
			<Navigation />

			<div className="relative z-10 px-6 pt-24 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-12 md:pt-32 lg:pt-40">
				{/* Header skeleton */}
				<div className="max-w-2xl mx-auto lg:mx-0">
					<div className="h-px w-16 bg-zinc-800 mb-8" />
					<div className="flex items-center gap-3 mb-4">
						<div className="w-5 h-5 rounded bg-zinc-800/50 animate-pulse" />
						<div className="h-3 w-24 bg-zinc-800/50 rounded animate-pulse" />
					</div>
					<div className="h-12 bg-zinc-800/40 rounded-lg w-48 animate-pulse" />
					<div className="h-5 bg-zinc-800/30 rounded w-full mt-6 animate-pulse" />
				</div>

				{/* Divider */}
				<div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

				{/* Timeline skeleton */}
				<div className="relative max-w-4xl mx-auto lg:mx-0 space-y-12">
					{[...Array(3)].map((_, i) => (
						<div
							key={i}
							className="border border-zinc-800/50 rounded-2xl p-6 md:p-8 animate-pulse"
						>
							<div className="flex flex-col md:flex-row gap-6 md:items-start justify-between mb-6">
								<div className="space-y-2 flex-1">
									<div className="h-7 w-48 bg-zinc-800/40 rounded" />
									<div className="flex gap-4">
										<div className="h-4 w-28 bg-zinc-800/30 rounded" />
										<div className="h-4 w-24 bg-zinc-800/30 rounded" />
									</div>
								</div>
								<div className="h-7 w-36 bg-zinc-800/30 rounded-full" />
							</div>
							<div className="space-y-2 pt-4 border-t border-zinc-800/30">
								<div className="h-4 w-full bg-zinc-800/20 rounded" />
								<div className="h-4 w-5/6 bg-zinc-800/20 rounded" />
								<div className="h-4 w-3/4 bg-zinc-800/20 rounded" />
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="h-24" />
		</div>
	);
}
