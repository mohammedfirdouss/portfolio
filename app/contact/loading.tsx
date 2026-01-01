import { Navigation } from "../components/nav";

export default function ContactLoading() {
	return (
		<div className="relative min-h-screen bg-black">
			<Navigation />

			<div className="relative z-10 px-6 pt-24 mx-auto space-y-8 max-w-2xl lg:px-8 md:space-y-16 md:pt-32 lg:pt-40">
				{/* Header skeleton */}
				<div>
					<div className="h-px w-16 bg-gradient-to-r from-zinc-500 to-transparent mb-8 animate-pulse" />
					<div className="space-y-4">
						<div className="h-12 bg-zinc-800/50 rounded-lg w-48 animate-pulse" />
						<div className="h-20 bg-zinc-800/30 rounded-lg w-full animate-pulse" />
					</div>
				</div>

				{/* Form skeleton */}
				<div className="space-y-6">
					{[...Array(4)].map((_, i) => (
						<div key={i} className="space-y-2">
							<div className="h-4 bg-zinc-800/50 rounded w-20 animate-pulse" />
							<div className="h-12 bg-zinc-900/50 border border-zinc-800 rounded-lg animate-pulse" />
						</div>
					))}
					<div className="h-12 bg-white/20 rounded-lg animate-pulse mt-8" />
				</div>
			</div>

			<div className="h-24" />
		</div>
	);
}
