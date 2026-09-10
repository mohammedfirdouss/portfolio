import { allBlogs } from "contentlayer/generated";
import { renderPageOgImage, ogSize } from "@/app/lib/og-image";

export const dynamicParams = false;
export const alt = "Mohammed Firdous";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams(): { slug: string }[] {
	// Match the page: every blog entry gets a page (external cross-posts too).
	return allBlogs.map((blog) => ({ slug: blog.slug }));
}

export default async function Image({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const blog = allBlogs.find((post) => post.slug === slug);

	return renderPageOgImage({
		title: blog?.title ?? "Blog",
		kicker: "Blog",
	});
}
