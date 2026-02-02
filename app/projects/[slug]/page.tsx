import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";
import { getRedis } from "@/util/redis";
import ReportView from "@/app/components/report-view-wrapper";

export const revalidate = 60;

type Props = {
	params: {
		slug: string;
	};
};

export async function generateStaticParams(): Promise<Props["params"][]> {
	return allProjects
		.filter((p) => p.date)
		.map((p) => ({
			slug: p.slug,
		}));
}

export default async function PostPage({ params }: Props) {
	const slug = params?.slug;
	const project = allProjects.find((project) => project.slug === slug);

	if (!project) {
		notFound();
	}

	let views = 0;
	const redis = getRedis();
	if (redis) {
		try {
			views =
				(await redis.get<number>(["pageviews", "projects", slug].join(":"))) ??
				0;
		} catch (e) {
			console.error(e);
		}
	}

	return (
		<div className="bg-black min-h-screen">
			<Header project={project} views={views} />

			<div className="relative">
				{/* Content Background Gradient */}
				<div className="absolute inset-0 bg-gradient-to-b from-zinc-950 to-black" />

				<article className="relative z-10 px-6 pt-24 pb-20 mx-auto prose prose-invert prose-zinc max-w-3xl">
					<Mdx code={project.body.code} />
				</article>
			</div>
		</div>
	);
}
