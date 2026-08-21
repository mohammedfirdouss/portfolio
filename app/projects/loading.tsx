export default function ProjectsLoading() {
	return (
		<div className="animate-pulse">
			<div className="h-14 w-48 bg-gray-100 dark:bg-gray-800 rounded mb-8" />
			<div className="h-6 w-full max-w-md bg-gray-100 dark:bg-gray-800 rounded mb-12" />
			<div className="space-y-10">
				{[...Array(6)].map((_, i) => (
					<div key={i} className="space-y-2">
						<div className="h-7 w-1/2 bg-gray-100 dark:bg-gray-800 rounded" />
						<div className="h-4 w-1/4 bg-gray-100 dark:bg-gray-800 rounded" />
						<div className="h-5 w-full bg-gray-100 dark:bg-gray-800 rounded mt-1" />
					</div>
				))}
			</div>
		</div>
	);
}
