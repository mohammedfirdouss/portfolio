import { notFound } from "next/navigation";
import { Mdx } from "@/app/components/mdx";
import { OutcomeProofBlock } from "@/app/components/outcome-proof-block";
import {
	TableOfContents,
	MobileTableOfContents,
} from "@/app/components/table-of-contents";
import "./mdx.css";
import { allBlogs } from "contentlayer/generated";
import Link from "next/link";
import { Fragment } from "react";
import { PostHeader, PostFooter } from "@/app/components/post-layout";
import { slugifyTag } from "@/app/lib/tags";

type Props = {
	params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
	return allBlogs.map((blog) => ({
		slug: blog.slug,
	}));
}

export default async function PostPage({ params }: Props) {
	const { slug } = await params;
	const blog = allBlogs.find((post) => post.slug === slug);

	if (!blog) {
		notFound();
	}

	const wordCount = blog.body.raw.split(/\s+/).filter(Boolean).length;
	const readingTime = wordCount > 100 ? Math.ceil(wordCount / 200) : null;

	// Only cycle through posts that actually live on this site — cross-posted
	// entries link out, so they don't belong in an on-site reading sequence.
	const internalPosts = allBlogs
		.filter((post) => !post.draft && !post.url && !post.externalUrl)
		.sort(
			(a, b) =>
				new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
		);
	const currentIndex = internalPosts.findIndex((post) => post.slug === slug);
	const newerPost = currentIndex > 0 ? internalPosts[currentIndex - 1] : null;
	const olderPost =
		currentIndex !== -1 && currentIndex < internalPosts.length - 1
			? internalPosts[currentIndex + 1]
			: null;

	return (
		<div>
			<PostHeader
				title={blog.title}
				meta={[
					formatDate(blog.publishedAt),
					readingTime && `${readingTime} min read`,
					blog.tags && blog.tags.length > 0 && (
						<>
							{blog.tags.map((tag, i) => (
								<Fragment key={tag}>
									{i > 0 && ", "}
									<Link href={`/tags/${slugifyTag(tag)}`} className="prose-link">
										{tag}
									</Link>
								</Fragment>
							))}
						</>
					),
				]}
			/>
			<OutcomeProofBlock
				outcomes={blog.outcomes}
				roleHighlights={blog.roleHighlights}
				proofLinks={blog.proofLinks}
			/>
			<MobileTableOfContents toc={blog.toc} />
			<div className="relative">
				<article>
					<Mdx code={blog.body.code} />
				</article>
				<aside className="hidden xl:block absolute top-0 right-full mr-8 w-48 2xl:mr-16 2xl:w-64">
					<div className="sticky top-24">
						<TableOfContents toc={blog.toc} />
					</div>
				</aside>
			</div>
			<PostFooter
				previous={
					olderPost && { href: `/blog/${olderPost.slug}`, label: olderPost.title }
				}
				next={
					newerPost && { href: `/blog/${newerPost.slug}`, label: newerPost.title }
				}
			/>
		</div>
	);
}

function formatDate(date: string) {
	return new Date(date).toLocaleDateString("en-us", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}
