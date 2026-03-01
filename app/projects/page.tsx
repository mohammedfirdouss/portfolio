import React from "react";
import Link from "next/link";
import { allProjects } from "contentlayer/generated";

export const metadata = {
	title: "Projects",
	description:
		"Cloud infrastructure, AI systems, and automation projects — from prototype to production.",
};

export const revalidate = 60;
export default async function ProjectsPage() {
	const projects = allProjects
		.filter((p) => p.published)
		.sort(
			(a, b) =>
				new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
				new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
		);

	return (
		<div>
			<h1 className="text-title mb-8 sm:mb-12">Building software is fun</h1>
			<div className="text-lg text-gray-700">
				<p>That&apos;s why I usually build most random ideas that cross my mind.</p>
				<p className="mt-4">
					I like building things I can use, or my friends can use. Here&apos;s a
					selection of things I actually &quot;finished&quot;; they range from 1 weekend
					experiments to full projects. I&apos;m always happy to chat :){" "}
					<a
						href="mailto:mohammedfirdous682@gmail.com"
						className="prose-link"
					>
						hit me up
					</a>
					!
				</p>
			</div>
			{projects.map((project) => (
				<div key={project.slug} className="my-8 mt-16 sm:mt-12 sm:mb-12">
					<div className="text-2xl leading-normal text-gray-900">
						<Link href={`/projects/${project.slug}`} className="prose-link">
							{project.title}
						</Link>
					</div>
					<div className="flex items-center gap-1 flex-wrap text-gray-400 text-sm">
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
									href={project.repository}
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
					<div className="text-lg text-gray-500 mt-2">
						{project.description}
					</div>
				</div>
			))}
		</div>
	);
}
