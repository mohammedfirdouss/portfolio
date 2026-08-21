export function getYoutubeEmbedId(url: string): string | null {
	let parsed: URL;
	try {
		parsed = new URL(url);
	} catch {
		return null;
	}

	const host = parsed.hostname.replace(/^www\./, "");

	if (host === "youtu.be") {
		return parsed.pathname.slice(1) || null;
	}

	if (host === "youtube.com" || host === "m.youtube.com") {
		if (parsed.pathname === "/watch") {
			return parsed.searchParams.get("v");
		}
		const liveMatch = parsed.pathname.match(/^\/live\/([^/]+)/);
		if (liveMatch) return liveMatch[1];
		const embedMatch = parsed.pathname.match(/^\/embed\/([^/]+)/);
		if (embedMatch) return embedMatch[1];
	}

	return null;
}
