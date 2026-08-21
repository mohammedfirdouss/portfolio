import Link from "next/link";

export default function Error500() {
	return (
		<div className="flex flex-col items-center justify-center py-24 text-center">
			<h1 className="text-6xl font-display text-gray-200 dark:text-gray-800 mb-4">500</h1>
			<h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Server error</h2>
			<p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
				Something went wrong on our end. Try refreshing.
			</p>
			<Link href="/" className="prose-link text-lg">
				cd ~
			</Link>
		</div>
	);
}
