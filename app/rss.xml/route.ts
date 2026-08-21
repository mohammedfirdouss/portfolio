import { allBlogs } from "contentlayer/generated";
import { siteUrl } from "../lib/site";

export const dynamic = "force-static";

function escapeXml(value: string): string {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}

export async function GET() {
	const posts = allBlogs
		.filter((post) => !post.draft)
		.sort(
			(a, b) =>
				new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
		);

	const items = posts
		.map((post) => {
			const link =
				post.url || post.externalUrl || `${siteUrl}/blog/${post.slug}`;
			return `
		<item>
			<title>${escapeXml(post.title)}</title>
			<link>${escapeXml(link)}</link>
			<guid isPermaLink="false">${escapeXml(`${siteUrl}/blog/${post.slug}`)}</guid>
			<pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
			<description>${escapeXml(post.description)}</description>
		</item>`;
		})
		.join("");

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
	<channel>
		<title>Mohammed Firdous</title>
		<link>${siteUrl}</link>
		<description>Articles and insights on cloud engineering, software development, and working with AWS.</description>
		<language>en-us</language>${items}
	</channel>
</rss>`;

	return new Response(xml, {
		headers: { "Content-Type": "application/xml; charset=utf-8" },
	});
}
