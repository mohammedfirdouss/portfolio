import { Navigation } from "../components/nav";

export default function ContactLoading() {
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
					<div className="h-12 bg-zinc-800/40 rounded-lg w-44 animate-pulse" />
					<div className="h-5 bg-zinc-800/30 rounded w-full mt-6 animate-pulse" />
				</div>

				{/* Divider */}
				<div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
			</div>

			{/* Social cards skeleton */}
			<div className="relative z-10 container px-6 mx-auto py-20 lg:px-8">
				<div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
					{[...Array(5)].map((_, i) => (
						<div
							key={i}
							className={`border border-zinc-800/50 rounded-2xl p-8 md:p-12 animate-pulse flex flex-col items-center gap-6 ${
								i === 3 ? "hidden lg:block" : ""
							}`}
						>
							<div className="w-16 h-16 rounded-2xl bg-zinc-800/40" />
							<div className="space-y-2 text-center">
								<div className="h-3 w-16 bg-zinc-800/40 rounded mx-auto" />
								<div className="h-5 w-40 bg-zinc-800/30 rounded mx-auto" />
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="h-24" />
		</div>
	);
}
