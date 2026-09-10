import { allProjects } from "contentlayer/generated";
import { renderPageOgImage, ogSize } from "@/app/lib/og-image";

export const dynamicParams = false;
export const alt = "Mohammed Firdous";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams(): { slug: string }[] {
	// Match the page: only published projects get pages.
	return allProjects
		.filter((project) => project.published)
		.map((project) => ({ slug: project.slug }));
}

export default async function Image({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const project = allProjects.find((entry) => entry.slug === slug);

	return renderPageOgImage({
		title: project?.title ?? "Project",
		kicker: "Project",
	});
}
