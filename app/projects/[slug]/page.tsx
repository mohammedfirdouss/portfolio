import { notFound } from "next/navigation";
import { Mdx } from "@/app/components/mdx";
import {
	PostHeader,
	PostFooter,
	formatMonth,
	neighbours,
	repositoryUrl,
} from "@/app/components/post-layout";
import "./mdx.css";
import { allProjects } from "contentlayer/generated";
import { withBasePath } from "@/app/lib/asset-path";

type Props = {
	params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
	return allProjects
		.filter((project) => project.published)
		.map((project) => ({
			slug: project.slug,
		}));
}

export default async function PostPage({ params }: Props) {
	const { slug } = await params;
	const project = allProjects.find((entry) => entry.slug === slug);

	if (!project) {
		notFound();
	}

	const { previous, next } = neighbours(
		allProjects.filter((p) => p.published),
		slug,
		"/projects",
	);

	return (
		<div>
			<PostHeader
				title={project.title}
				meta={[
					project.date && formatMonth(project.date),
					project.repository && (
						<a href={repositoryUrl(project.repository)} target="_blank" rel="noopener noreferrer" className="prose-link">
							source
						</a>
					),
				]}
				summary={project.description}
			/>
			{project.banner && (
				<img
					src={withBasePath(project.banner)}
					alt={project.title}
					className="w-full mb-7"
				/>
			)}
			<article>
				<Mdx code={project.body.code} />
			</article>
			<PostFooter previous={previous} next={next} />
		</div>
	);
}
