import { notFound } from "next/navigation";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";
import { getRedis } from "@/util/redis";
import ReportView from "@/app/components/report-view-wrapper";
import { allBlogs } from "contentlayer/generated";

export const revalidate = 60;

type Props = {
	params: {
		slug: string;
	};
};

export async function generateStaticParams(): Promise<Props["params"][]> {
	return allBlogs.map((blog) => ({
		slug: blog.slug,
	}));
}

export default async function PostPage({ params }: Props) {
	const slug = params?.slug;
	const blog = allBlogs.find((post) => post.slug === slug);

	if (!blog) {
		notFound();
	}

	const redis = getRedis();
	let views = 0;
	if (redis) {
		try {
			const result = await redis.get(["pageviews", "blogs", blog.slug].join(":"));
			views = typeof result === "number" ? result : Number(result ?? 0);
		} catch (e) {
			console.warn("Failed to fetch blog views:", e);
		}
	}

	return (
		<div className="min-h-screen bg-black">
			<Header blog={blog} views={views} />
			<div className="container px-6 py-12 mx-auto lg:py-16">
				<div className="mx-auto max-w-3xl">
					<ReportView slug={blog.slug} />
					<article className="prose prose-zinc prose-invert max-w-none">
						<Mdx code={blog.body.code} />
					</article>
				</div>
			</div>
		</div>
	);
}
