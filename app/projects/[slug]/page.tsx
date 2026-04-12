import { notFound } from "next/navigation";
import { Mdx } from "@/app/components/mdx";
import "./mdx.css";
import { allProjects } from "contentlayer/generated";
import Link from "next/link";

type Props = {
	params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
	return allProjects.map((project) => ({
		slug: project.slug,
	}));
}

export default async function PostPage({ params }: Props) {
	const { slug } = await params;
	const project = allProjects.find((entry) => entry.slug === slug);

	if (!project) {
		notFound();
	}

	return (
		<div>
			<div className="mb-12">
				<h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
					{project.title}
				</h1>
				<div className="text-gray-400 mt-2 text-sm flex gap-2 items-center flex-wrap">
					{project.date && (
						<time>
							{new Date(project.date).toLocaleDateString("en-us", {
								year: "numeric",
								month: "long",
							})}
						</time>
					)}
					{project.repository && (
						<>
							<span>·</span>
							<a
								href={
									project.repository.startsWith("http")
										? project.repository
										: `https://github.com/${project.repository}`
								}
								target="_blank"
								rel="noopener noreferrer"
								className="prose-link text-sm"
							>
								source
							</a>
						</>
					)}
				</div>
				{project.banner && (
					<div className="my-4">
						<img
							src={project.banner}
							alt={project.title}
							className="rounded-xl w-full"
						/>
					</div>
				)}
				<p className="text-gray-500 mt-4 text-lg">{project.description}</p>
			</div>
			<article className="prose max-w-none prose-headings:mt-8 prose-headings:mb-3">
				<Mdx code={project.body.code} />
			</article>
			<div className="mt-8 text-sm font-mono text-gray-500">
				<Link href="/projects" className="prose-link">
					cd ..
				</Link>
			</div>
		</div>
	);
}
