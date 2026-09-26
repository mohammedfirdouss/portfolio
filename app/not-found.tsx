import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center py-24 text-center">
			<h1 className="page-title">404</h1>
			<h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Page not found</h2>
			<p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
				The page you&apos;re looking for doesn&apos;t exist.
			</p>
			<Link href="/" className="prose-link text-lg">
				cd ~
			</Link>
		</div>
	);
}
