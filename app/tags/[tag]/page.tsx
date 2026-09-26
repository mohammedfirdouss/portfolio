import { notFound } from "next/navigation";
import Link from "next/link";
import { getTagIndex } from "@/app/lib/tags";

type Props = {
	params: Promise<{ tag: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams(): Promise<{ tag: string }[]> {
	return [...getTagIndex().keys()].map((tag) => ({ tag }));
}

export default async function TagPage({ params }: Props) {
	const { tag } = await params;
	const entry = getTagIndex().get(tag);

	if (!entry) {
		notFound();
	}

	const posts = [...entry.posts].sort(
		(a, b) =>
			new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
	);

	return (
		<div>
			<div className="mb-6">
				<Link
					href="/tags"
					className="text-sm text-[color:var(--muted)] transition-colors"
				>
					← tags
				</Link>
			</div>
			<h1 className="page-title">
				{entry.label}
			</h1>
			<ul>
				{posts.map((post) => {
					const isExternal = !!post.url;
					const href = post.url || `/blog/${post.slug}`;
					return (
						<li key={post.slug} className="mb-6">
							<div className="text-lg leading-tight flex flex-col gap-1">
								{isExternal ? (
									<a
										href={href}
										target="_blank"
										rel="noopener noreferrer"
										className="prose-link text-2xl"
									>
										{post.title}
										<span className="text-base ml-1 text-[color:var(--muted)]">↗</span>
									</a>
								) : (
									<Link href={href} className="prose-link text-2xl">
										{post.title}
									</Link>
								)}
								<div className="text-[color:var(--muted)] text-base">
									{post.description}
								</div>
								<time className="text-[color:var(--muted)] text-sm">
									{new Date(post.publishedAt).toLocaleDateString("en-us", {
										year: "numeric",
										month: "short",
										day: "numeric",
									})}
								</time>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
