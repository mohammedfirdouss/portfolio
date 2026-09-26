import Link from "next/link";
import { Fragment } from "react";
import { allBlogs } from "contentlayer/generated";
import { slugifyTag } from "../lib/tags";
import { postLinks } from "../lib/posts";

export const metadata = {
	title: "Blog",
	description:
		"Articles and insights on cloud engineering, software development, and working with AWS.",
};

function isSameYear(a: string, b?: string) {
	if (!a || !b) return false;
	return new Date(a).getFullYear() === new Date(b).getFullYear();
}

export default async function BlogPage() {
	const sorted = allBlogs.sort(
		(a, b) =>
			new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
	);

	return (
		<div>
			<h1 className="page-title">blog</h1>
			<p className="mb-7">
				Writing on cloud infrastructure, AI systems, and open source. Some
				pieces are cross-posted from dev.to or Medium.
			</p>
			{sorted.map((post, index) => {
				const showYear = !isSameYear(
					post.publishedAt,
					sorted[index - 1]?.publishedAt,
				);
				const isExternal = !!post.url;
				const href = post.url || `/blog/${post.slug}`;
				const wordCount = post.body.raw.split(/\s+/).filter(Boolean).length;
				const readingTime =
					!isExternal && wordCount > 100 ? Math.ceil(wordCount / 200) : null;

				return (
					<Fragment key={post.slug}>
						{showYear && (
							<>
								{index > 0 && <hr />}
								<h2 className="section-title">
									{new Date(post.publishedAt).getFullYear()}
								</h2>
							</>
						)}
						<article>
							<h3 className="post-title">
								{isExternal ? (
									<a
										href={href}
										target="_blank"
										rel="noopener noreferrer"
										className="prose-link"
									>
										{post.title} ↗
									</a>
								) : (
									<Link href={href} className="prose-link">
										{post.title}
									</Link>
								)}
							</h3>
							<p className="post-meta">
								{new Date(post.publishedAt).toLocaleDateString("en-us", {
									year: "numeric",
									month: "long",
									day: "numeric",
								})}
								{readingTime && ` · ${readingTime} min read`}
								{post.tags && post.tags.length > 0 && " │ "}
								{post.tags?.map((tag, i) => (
									<Fragment key={tag}>
										{i > 0 && ", "}
										<Link href={`/tags/${slugifyTag(tag)}`} className="prose-link">
											{tag}
										</Link>
									</Fragment>
								))}
								{postLinks(post).map((link, i) => (
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
					</Fragment>
				);
			})}
		</div>
	);
}
