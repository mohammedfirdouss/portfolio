export default function BlogLoading() {
	return (
		<div className="animate-pulse">
			<div className="h-14 w-32 bg-[color:var(--rule)] rounded mb-8" />
			<div className="h-6 w-full max-w-md bg-[color:var(--rule)] rounded mb-12" />
			<div className="space-y-8">
				{[...Array(6)].map((_, i) => (
					<div key={i} className="space-y-2">
						<div className="h-6 w-2/3 bg-[color:var(--rule)] rounded" />
						<div className="h-4 w-1/3 bg-[color:var(--rule)] rounded" />
					</div>
				))}
			</div>
		</div>
	);
}
