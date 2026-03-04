import { defineDocumentType, makeSource } from "contentlayer/source-files";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
	path: {
		type: "string",
		resolve: (doc) => `/${doc._raw.flattenedPath}`,
	},
	slug: {
		type: "string",
		resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
	},
};

export const Project = defineDocumentType(() => ({
	name: "Project",
	filePathPattern: "./projects/**/*.mdx",
	contentType: "mdx",
	fields: {
		published: { type: "boolean" },
		title: { type: "string", required: true },
		description: { type: "string", required: true },
		date: { type: "date" },
		externalUrl: { type: "string" },
		repository: { type: "string" },
		banner: { type: "string" },
		screenshot: { type: "string" },
	},
	computedFields,
}));

export const OpenSource = defineDocumentType(() => ({
	name: "OpenSource",
	filePathPattern: "./open-source/**/*.mdx",
	contentType: "mdx",
	fields: {
		title: { type: "string", required: true },
		summary: { type: "string" },
		date: { type: "date" },
		url: { type: "string" },
		repository: { type: "string" },
		published: { type: "boolean" },
	},
	computedFields,
}));

export const Diagram = defineDocumentType(() => ({
	name: "Diagram",
	filePathPattern: "./diagrams/**/*.mdx",
	contentType: "mdx",
	fields: {
		title: { type: "string", required: true },
		summary: { type: "string" },
		date: { type: "date" },
		url: { type: "string" },
		repository: { type: "string" },
		published: { type: "boolean" },
	},
	computedFields,
}));

export const Experience = defineDocumentType(() => ({
	name: "Experience",
	filePathPattern: "./experience/**/*.mdx",
	contentType: "mdx",
	fields: {
		role: { type: "string", required: true },
		company: { type: "string", required: true },
		companyUrl: { type: "string" },
		startDate: { type: "date", required: true },
		endDate: { type: "date" },
		location: { type: "string" },
		description: { type: "string", required: true },
	},
	computedFields,
}));

export const Changelog = defineDocumentType(() => ({
	name: "Changelog",
	filePathPattern: "./changelog/**/*.mdx",
	contentType: "mdx",
	fields: {
		title: { type: "string", required: true },
		date: { type: "date", required: true },
		summary: { type: "string", required: true },
		image: { type: "string" },
	},
	computedFields,
}));

export const Talk = defineDocumentType(() => ({
	name: "Talk",
	filePathPattern: "./talks/**/*.mdx",
	contentType: "mdx",
	fields: {
		title: { type: "string", required: true },
		event: { type: "string", required: true },
		date: { type: "date", required: true },
		url: { type: "string" },
		topic: { type: "string" },
		published: { type: "boolean" },
		summary: { type: "string" },
	},
	computedFields,
}));

export const Certification = defineDocumentType(() => ({
	name: "Certification",
	filePathPattern: "./certifications/**/*.mdx",
	contentType: "mdx",
	fields: {
		title: { type: "string", required: true },
		organization: { type: "string", required: true },
		date: { type: "date", required: true },
		credentialId: { type: "string" },
		credentialUrl: { type: "string" },
		image: { type: "string" },
	},
	computedFields,
}));

export const Page = defineDocumentType(() => ({
	name: "Page",
	filePathPattern: "{pages,uses}/**/*.mdx",
	contentType: "mdx",
	fields: {
		title: {
			type: "string",
			required: true,
		},
		description: {
			type: "string",
		},
		updatedAt: {
			type: "date",
		},
	},
	computedFields,
}));

export const Blog = defineDocumentType(() => ({
	name: "Blog",
	filePathPattern: "./blog/**/*.mdx",
	contentType: "mdx",
	fields: {
		title: { type: "string", required: true },
		description: { type: "string", required: true },
		publishedAt: { type: "date", required: true },
		url: { type: "string" },
		externalUrl: { type: "string" },
		source: { type: "string" },
		draft: { type: "boolean" },
		tags: { type: "list", of: { type: "string" } },
	},
	computedFields,
}));

export default makeSource({
	contentDirPath: "./content",
	documentTypes: [
		Page,
		Project,
		OpenSource,
		Diagram,
		Talk,
		Blog,
		Experience,
		Changelog,
		Certification,
	],
	mdx: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [
			rehypeSlug,
			[
				rehypePrettyCode,
				{
					theme: "github-dark",
					onVisitLine(node) {
						// Prevent lines from collapsing in `display: grid` mode, and allow empty
						// lines to be copy/pasted
						if (node.children.length === 0) {
							node.children = [{ type: "text", value: " " }];
						}
					},
					onVisitHighlightedLine(node) {
						node.properties.className.push("line--highlighted");
					},
					onVisitHighlightedWord(node) {
						node.properties.className = ["word--highlighted"];
					},
				},
			],
			[
				rehypeAutolinkHeadings,
				{
					properties: {
						className: ["subheading-anchor"],
						ariaLabel: "Link to section",
					},
				},
			],
		],
	},
});
