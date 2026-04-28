import Link from "next/link";
import { allBlogs } from "contentlayer/generated";

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
			<h1 className="font-display text-8xl text-gray-200 mb-8">blog</h1>
			<div className="text-lg text-gray-700 mb-12">
				<p>
					Writing on cloud engineering, Kubernetes, AI systems, open source,
					etc. Some pieces are published here, others cross-posted from dev.to
					or Medium.
				</p>
			</div>
			<ul>
				{sorted.map((post, index) => {
					const showYear = !isSameYear(
						post.publishedAt,
						sorted[index - 1]?.publishedAt,
					);
					const isExternal = !!post.url;
					const href = isExternal ? post.url! : `/blog/${post.slug}`;

					return (
						<li key={post.slug} className="mb-6">
							{showYear && (
								<div className="select-none relative h-18 pointer-events-none">
									<span className="text-7xl -ml-2 xl:-ml-18 absolute top-0 relative -z-10 font-display text-gray-200">
										{new Date(post.publishedAt).getFullYear()}
									</span>
								</div>
							)}
							<div className="text-lg leading-tight flex flex-col gap-1">
								<div className="flex items-baseline gap-2 flex-wrap">
									{isExternal ? (
										<a
											href={href}
											target="_blank"
											rel="noopener noreferrer"
											className="prose-link text-2xl"
										>
											{post.title}
											<span className="text-base ml-1 text-gray-400">↗</span>
										</a>
									) : (
										<Link href={href} className="prose-link text-2xl">
											{post.title}
										</Link>
									)}
								</div>
								<div className="text-gray-500 text-base">
									{post.description}
								</div>
								<div className="text-gray-400 text-sm flex gap-1 items-center flex-wrap">
									<time>
										{new Date(post.publishedAt).toLocaleDateString("en-us", {
											year: "numeric",
											month: "short",
											day: "numeric",
										})}
									</time>
									{post.source && (
										<>
											<span>·</span>
											<span className="text-gray-400">{post.source}</span>
										</>
									)}
									{post.tags && post.tags.length > 0 && (
										<>
											<span>·</span>
											<div className="flex gap-1 flex-wrap">
												{post.tags.map((tag) => (
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
						</li>
					);
				})}
			</ul>
		</div>
	);
}
