"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			console.error("Error:", error);
		}
	}, [error]);

	return (
		<div className="flex flex-col items-center justify-center py-24 text-center">
			<h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
				Something went wrong
			</h1>
			<p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
				An unexpected error occurred. Please try again.
			</p>
			<div className="flex gap-4">
				<button
					type="button"
					onClick={reset}
					className="px-6 py-3 text-sm font-medium text-white bg-sky-600 dark:bg-sky-500 rounded-lg hover:bg-sky-700 hover:dark:bg-sky-600 transition"
				>
					Try again
				</button>
				<Link
					href="/"
					className="px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 hover:dark:bg-gray-900 transition"
				>
					Go back home
				</Link>
			</div>
		</div>
	);
}
