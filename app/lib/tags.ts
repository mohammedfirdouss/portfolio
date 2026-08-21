import { allBlogs, type Blog } from "contentlayer/generated";

export function slugifyTag(tag: string): string {
	return tag
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "");
}

export type TagEntry = { label: string; posts: Blog[] };

export function getTagIndex(): Map<string, TagEntry> {
	const index = new Map<string, TagEntry>();

	for (const post of allBlogs) {
		if (post.draft) continue;
		for (const tag of post.tags ?? []) {
			const slug = slugifyTag(tag);
			const entry = index.get(slug);
			if (entry) {
				entry.posts.push(post);
			} else {
				index.set(slug, { label: tag, posts: [post] });
			}
		}
	}

	return index;
}
