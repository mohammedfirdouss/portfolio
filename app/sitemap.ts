import type { MetadataRoute } from "next";
import {
	allBlogs,
	allProjects,
	allOpenSources,
	allDiagrams,
	allTalks,
} from "contentlayer/generated";
import { siteUrl } from "./lib/site";

const staticRoutes = [
	"",
	"/blog",
	"/projects",
	"/experience",
	"/open-source",
	"/diagrams",
	"/talks",
	"/certifications",
	"/systems-design",
];

export default function sitemap(): MetadataRoute.Sitemap {
	const staticEntries = staticRoutes.map((route) => ({
		url: `${siteUrl}${route}`,
	}));

	// Cross-posted blog entries link out to their external source, so their
	// internal /blog/[slug] page isn't linked from the site and shouldn't be
	// listed here either.
	const blogEntries = allBlogs
		.filter((post) => !post.draft && !post.url && !post.externalUrl)
		.map((post) => ({
			url: `${siteUrl}/blog/${post.slug}`,
			lastModified: new Date(post.publishedAt),
		}));

	const projectEntries = allProjects
		.filter((project) => project.published)
		.map((project) => ({ url: `${siteUrl}/projects/${project.slug}` }));

	const openSourceEntries = allOpenSources
		.filter((item) => item.published !== false)
		.map((item) => ({ url: `${siteUrl}/open-source/${item.slug}` }));

	const diagramEntries = allDiagrams
		.filter((item) => item.published !== false)
		.map((item) => ({ url: `${siteUrl}/diagrams/${item.slug}` }));

	const talkEntries = allTalks
		.filter((talk) => talk.published !== false)
		.map((talk) => ({ url: `${siteUrl}/talks/${talk.slug}` }));

	return [
		...staticEntries,
		...blogEntries,
		...projectEntries,
		...openSourceEntries,
		...diagramEntries,
		...talkEntries,
	];
}
