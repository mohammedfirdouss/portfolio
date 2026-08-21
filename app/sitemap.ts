import type { MetadataRoute } from "next";
import {
	allBlogs,
	allProjects,
	allOpenSources,
	allDiagrams,
	allTalks,
} from "contentlayer/generated";
import { siteUrl } from "./lib/site";
import { getTagIndex } from "./lib/tags";

export const dynamic = "force-static";

const staticRoutes = [
	"",
	"/about",
	"/blog",
	"/projects",
	"/experience",
	"/open-source",
	"/diagrams",
	"/talks",
	"/certifications",
	"/systems-design",
	"/tags",
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
		.map((project) => ({
			url: `${siteUrl}/projects/${project.slug}`,
			...(project.date && { lastModified: new Date(project.date) }),
		}));

	const openSourceEntries = allOpenSources
		.filter((item) => item.published !== false)
		.map((item) => ({
			url: `${siteUrl}/open-source/${item.slug}`,
			...(item.date && { lastModified: new Date(item.date) }),
		}));

	const diagramEntries = allDiagrams
		.filter((item) => item.published !== false)
		.map((item) => ({
			url: `${siteUrl}/diagrams/${item.slug}`,
			...(item.date && { lastModified: new Date(item.date) }),
		}));

	const talkEntries = allTalks
		.filter((talk) => talk.published !== false)
		.map((talk) => ({
			url: `${siteUrl}/talks/${talk.slug}`,
			lastModified: new Date(talk.date),
		}));

	const tagEntries = [...getTagIndex().keys()].map((tag) => ({
		url: `${siteUrl}/tags/${tag}`,
	}));

	return [
		...staticEntries,
		...blogEntries,
		...projectEntries,
		...openSourceEntries,
		...diagramEntries,
		...talkEntries,
		...tagEntries,
	];
}
