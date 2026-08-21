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
			<div className="mb-6">
				<Link href="/blog" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
					← blog
				</Link>
			</div>
			<div className="mb-12">
				<h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
					{blog.title}
				</h1>
				<div className="text-gray-500 mt-2 text-sm flex gap-2 items-center flex-wrap">
					<time>
						{new Date(blog.publishedAt).toLocaleDateString("en-us", {
							year: "numeric",
							month: "short",
							day: "numeric",
						})}
					</time>
					{readingTime && (
						<>
							<span>·</span>
							<span>{readingTime} min read</span>
						</>
					)}
					{blog.tags && blog.tags.length > 0 && (
						<>
							<span>·</span>
							<div className="flex gap-1 flex-wrap">
								{blog.tags.map((tag) => (
									<span
										key={tag}
										className="bg-gray-100 px-2 py-px text-sky-600 rounded text-xs"
									>
										{tag}
									</span>
								))}
							</div>
						</>
					)}
				</div>
			</div>
			<OutcomeProofBlock
				outcomes={blog.outcomes}
				roleHighlights={blog.roleHighlights}
				proofLinks={blog.proofLinks}
			/>
			<MobileTableOfContents toc={blog.toc} />
			<div className="relative">
				<article className="prose max-w-none prose-headings:mt-8 prose-headings:mb-3">
					<Mdx code={blog.body.code} />
				</article>
				<aside className="hidden xl:block absolute top-0 right-full mr-8 w-48 2xl:mr-16 2xl:w-64">
					<div className="sticky top-24">
						<TableOfContents toc={blog.toc} />
					</div>
				</aside>
			</div>
			{(olderPost || newerPost) && (
				<div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-6 sm:justify-between">
					{olderPost ? (
						<Link
							href={`/blog/${olderPost.slug}`}
							className="group sm:max-w-[48%]"
						>
							<div className="text-xs text-gray-400 mb-1">← Older</div>
							<div className="prose-link text-base">{olderPost.title}</div>
						</Link>
					) : (
						<div />
					)}
					{newerPost && (
						<Link
							href={`/blog/${newerPost.slug}`}
							className="group sm:max-w-[48%] sm:text-right"
						>
							<div className="text-xs text-gray-400 mb-1">Newer →</div>
							<div className="prose-link text-base">{newerPost.title}</div>
						</Link>
					)}
				</div>
			)}
			<div className="mt-8 text-sm font-mono text-gray-500">
				<Link href="/blog" className="prose-link">
					cd ..
				</Link>
			</div>
		</div>
	);
}
