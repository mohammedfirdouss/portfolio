"use client";

import { useEffect } from "react";

export const ReportView: React.FC<{ slug: string }> = ({ slug }) => {
	console.log("process.env.NODE_ENV", process.env.NODE_ENV);
	console.log("typeof window", typeof window);
	useEffect(() => {
		fetch("/api/incr", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ slug }),
		});
	}, [slug]);

	return null;
};
