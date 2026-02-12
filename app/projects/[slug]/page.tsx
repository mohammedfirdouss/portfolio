import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";
import { getRedis } from "@/util/redis";
import { allProjects } from "contentlayer/generated";

export const revalidate = 60;

const ProjectView = dynamic(
	() => import("./view").then((mod) => ({ default: mod.ReportView })),
	{ ssr: false },
);

type Props = {
	params: {
		slug: string;
	};
};

export async function generateStaticParams(): Promise<Props["params"][]> {
	return allProjects.map((project) => ({
		slug: project.slug,
	}));
}

export default async function PostPage({ params }: Props) {
	const slug = params?.slug;
	const project = allProjects.find((entry) => entry.slug === slug);

	if (!project) {
		notFound();
	}

	const redis = getRedis();
	let views = 0;
	if (redis) {
		try {
			const result = await redis.get(
				["pageviews", "projects", project.slug].join(":"),
			);
			views = typeof result === "number" ? result : Number(result ?? 0);
		} catch (e) {
			console.warn("Failed to fetch project views:", e);
		}
	}

	return (
		<div className="bg-black min-h-screen">
			<Header project={project} views={views} />

			<div className="relative px-6 py-12 md:py-16">
				<div className="max-w-3xl mx-auto">
					<ProjectView slug={project.slug} />
					<article className="prose prose-zinc prose-invert max-w-none">
						<Mdx code={project.body.code} />
					</article>
				</div>
			</div>
		</div>
	);
}
