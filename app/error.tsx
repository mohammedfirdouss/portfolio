"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
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
			<h1 className="text-4xl font-bold text-gray-900 mb-4">
				Something went wrong
			</h1>
			<p className="text-lg text-gray-500 mb-8">
				An unexpected error occurred. Please try again.
			</p>
			<div className="flex gap-4">
				<button
					onClick={reset}
					className="px-6 py-3 text-sm font-medium text-white bg-sky-600 rounded-lg hover:bg-sky-700 transition"
				>
					Try again
				</button>
				<Link
					href="/"
					className="px-6 py-3 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
				>
					Go back home
				</Link>
			</div>
		</div>
	);
}
