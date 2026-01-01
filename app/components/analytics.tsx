"use client";

import { useEffect } from "react";
import { AnalyticsScript } from "./analytics-script";

export default function Analytics({ pathname }: { pathname: string }) {
	const token = process.env.NEXT_PUBLIC_BEAM_TOKEN;

	useEffect(() => {
		if (token) {
			// @ts-ignore
			window.beam("pageview", { path: pathname });
		}
	}, [pathname, token]);

	if (!token) {
		return null;
	}

	return <AnalyticsScript token={token} />;
}
