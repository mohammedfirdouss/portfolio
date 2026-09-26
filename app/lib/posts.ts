import type { Blog } from "contentlayer/generated";

export type ExternalLink = { label: string; href: string };

/**
 * Off-site links for a post, shown after its tags: where the full article
 * lives (`source` + `url`), then any threads it was discussed in.
 */
export function postLinks(post: Blog): ExternalLink[] {
	const links: ExternalLink[] = [];
	if (post.url && post.source) {
		links.push({ label: post.source, href: post.url });
	}
	for (const d of post.discussions ?? []) {
		links.push({ label: d.label, href: d.href });
	}
	return links;
}
