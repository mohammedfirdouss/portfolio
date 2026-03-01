import { notFound } from "next/navigation";
import { Mdx } from "@/app/components/mdx";
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

	return (
		<div>
			<div className="mb-8">
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
				<p className="text-gray-500 mt-4 text-lg">{blog.description}</p>
			</div>
			<article className="prose max-w-none">
				<Mdx code={blog.body.code} />
			</article>
			<div className="mt-8 text-sm font-mono text-gray-500">
				<Link href="/blog" className="prose-link">
					cd ..
				</Link>
			</div>
		</div>
	);
}
