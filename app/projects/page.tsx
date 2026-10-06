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
	const featured = projects.filter((p) => p.featured);
	const archive = projects.filter((p) => !p.featured);

	return (
		<div>
			<h1 className="page-title">projects</h1>
			<div className="text-lg text-[color:var(--fg)]">
				<p>
					These are projects I have built and finished. Some are polished,
					some are quick experiments. If you want to talk about any of them,{" "}
					<a href="mailto:mohammedfirdous682@gmail.com" className="prose-link">
						send me an email
					</a>
					.
				</p>
			</div>

			{featured.length > 0 && (
				<div className="mt-12">
					<h2 className="section-title">featured</h2>
					<ProjectList projects={featured} />
				</div>
			)}

			{archive.length > 0 && (
				<div className="mt-12">
					<h2 className="section-title">archive</h2>
					<p className="text-[color:var(--muted)]">
						Earlier projects, experiments and hackathon builds.
					</p>
					<ProjectList projects={archive} />
				</div>
			)}
		</div>
	);
}
