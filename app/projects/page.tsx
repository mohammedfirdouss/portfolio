import React from "react";
import { allProjects } from "contentlayer/generated";
import { ProjectList } from "@/app/components/project-list";

export const metadata = {
	title: "Projects",
	description:
		"Cloud infrastructure, AI systems, and automation projects, from prototype to production.",
};

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
			<h1 className="font-display text-5xl sm:text-6xl md:text-7xl xl:text-8xl text-gray-200 mb-8">projects</h1>
			<div className="text-lg text-gray-700">
				<p>
					I build things I can use or reference, or that others can. Here are
					some I actually &quot;finished&quot;; some polished, some quick
					experiments. Happy to chat,{" "}
					<a href="mailto:mohammedfirdous682@gmail.com" className="prose-link">
						hit me up
					</a>
					!
				</p>
			</div>
			<ProjectList projects={projects} />
		</div>
	);
}
