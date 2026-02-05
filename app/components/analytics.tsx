"use client";

import { useEffect } from "react";
import { AnalyticsScript } from "./analytics-script";

declare global {
	interface Window {
		beam?: (event: string, data: Record<string, unknown>) => void;
	}
}

export default function Analytics({ pathname }: { pathname: string }) {
	const token = process.env.NEXT_PUBLIC_BEAM_TOKEN;

	useEffect(() => {
		if (token && typeof window !== "undefined" && window.beam) {
			window.beam("pageview", { path: pathname });
		}
	}, [pathname, token]);

	if (!token) {
		return null;
	}

	return <AnalyticsScript token={token} />;
}
