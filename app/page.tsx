import Link from "next/link";
import React, { Fragment } from "react";
import {
	allProjects,
	allBlogs,
	allTalks,
	allOpenSources,
	type Blog,
} from "contentlayer/generated";
import { slugifyTag } from "./lib/tags";
import { postLinks, type ExternalLink } from "./lib/posts";

type Entry = {
	key: string;
	title: string;
	href: string;
	date?: string;
	dateStyle: "day" | "month";
	tags?: { label: string; href?: string }[];
	links?: ExternalLink[];
};

function formatDate(date: string, style: Entry["dateStyle"]) {
	return new Date(date).toLocaleDateString("en-us", {
		year: "numeric",
		month: "long",
		day: style === "day" ? "numeric" : undefined,
	});
}

function Section({
	title,
	entries,
	viewAll,
}: {
	title: string;
	entries: Entry[];
	viewAll?: string;
}) {
	return (
		<section>
			<h2 className="section-title">{title}</h2>
			{entries.map((entry) => (
				<article key={entry.key}>
					<h3 className="post-title">
						<Link href={entry.href} className="prose-link">
							{entry.title}
						</Link>
					</h3>
					<p className="post-meta">
						{entry.date && formatDate(entry.date, entry.dateStyle)}
						{entry.date && entry.tags && entry.tags.length > 0 && " │ "}
						{entry.tags?.map((tag, i) => (
							<Fragment key={tag.label}>
								{i > 0 && ", "}
								{tag.href ? (
									<Link href={tag.href} className="prose-link">
										{tag.label}
									</Link>
								) : (
									tag.label
								)}
							</Fragment>
						))}
						{entry.links?.map((link, i) => (
							<Fragment key={link.href}>
								{i === 0 ? " │ " : ", "}
								<a
									href={link.href}
									target="_blank"
									rel="noopener noreferrer"
									className="prose-link"
								>
									{link.label} ↗
								</a>
							</Fragment>
						))}
					</p>
				</article>
			))}
			{viewAll && (
				<p className="view-all">
					<Link href={viewAll} className="prose-link">
						View all →
					</Link>
				</p>
			)}
			<hr />
		</section>
	);
}

const byDateDesc = (a?: string, b?: string) =>
	new Date(b ?? 0).getTime() - new Date(a ?? 0).getTime();

export default function Home() {
	const toBlogEntry = (post: Blog): Entry => ({
		key: post.slug,
		title: post.title,
		href: `/blog/${post.slug}`,
		date: post.publishedAt,
		dateStyle: "day",
		tags: post.tags?.map((t) => ({
			label: t,
			href: `/tags/${slugifyTag(t)}`,
		})),
		links: postLinks(post),
	});

	const blogs: Entry[] = allBlogs
		.filter((p) => !p.draft)
		.sort((a, b) => byDateDesc(a.publishedAt, b.publishedAt))
		.slice(0, 8)
		.map(toBlogEntry);

	// Hand-picked with `featured: true`, like the "popular" list on
	// seangoedecke.com. Projects first, then writing.
	const featured: Entry[] = [
		...allProjects
			.filter((p) => p.published && p.featured)
			.sort((a, b) => byDateDesc(a.date, b.date))
			.map(
				(project): Entry => ({
					key: `project-${project.slug}`,
					title: project.title,
					href: `/projects/${project.slug}`,
					date: project.date,
					dateStyle: "month",
					tags: [{ label: "project", href: "/projects" }],
				}),
			),
		...allBlogs
			.filter((p) => !p.draft && p.featured)
			.sort((a, b) => byDateDesc(a.publishedAt, b.publishedAt))
			.map((post) => ({
				...toBlogEntry(post),
				key: `blog-${post.slug}`,
				dateStyle: "month" as const,
				tags: [{ label: "writing", href: "/blog" }],
			})),
	];

	const projects: Entry[] = allProjects
		.filter((p) => p.published)
		.sort((a, b) => byDateDesc(a.date, b.date))
		.slice(0, 6)
		.map((project) => ({
			key: project.slug,
			title: project.title,
			href: `/projects/${project.slug}`,
			date: project.date,
			dateStyle: "month",
		}));

	const openSource: Entry[] = allOpenSources
		.filter((c) => c.published !== false)
		.sort((a, b) => byDateDesc(a.date, b.date))
		.slice(0, 3)
		.map((contrib) => ({
			key: contrib.slug,
			title: contrib.title,
			href: `/open-source/${contrib.slug}`,
			date: contrib.date,
			dateStyle: "month",
		}));

	const talks: Entry[] = allTalks
		.filter((t) => t.published !== false)
		.sort((a, b) => byDateDesc(a.date, b.date))
		.slice(0, 3)
		.map((talk) => ({
			key: talk.slug,
			title: talk.title,
			href: `/talks/${talk.slug}`,
			date: talk.date,
			dateStyle: "month",
		}));

	return (
		<div>
			<p className="mb-7">
				I&apos;m Mohammed Firdous, a software engineer working on cloud
				infrastructure and AI. I am currently mentoring on PipeCD through
				CNCF LFX. I also contribute to open source and have won three
				hackathons so far.
			</p>
			<hr />
			{featured.length > 0 && <Section title="featured" entries={featured} />}
			<Section title="writing" entries={blogs} viewAll="/blog" />
			<Section title="projects" entries={projects} viewAll="/projects" />
			<Section title="open source" entries={openSource} viewAll="/open-source" />
			<Section title="talks" entries={talks} viewAll="/talks" />
		</div>
	);
}
