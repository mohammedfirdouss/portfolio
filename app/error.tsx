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
			<h1 className="page-title">
				Something went wrong
			</h1>
			<p className="text-lg text-[color:var(--muted)] mb-8">
				An unexpected error occurred. Please try again.
			</p>
			<div className="flex gap-6">
				<button
					type="button"
					onClick={reset}
					className="link-button"
				>
					Try again
				</button>
				<Link
					href="/"
					className="prose-link"
				>
					Go back home
				</Link>
			</div>
		</div>
	);
}
