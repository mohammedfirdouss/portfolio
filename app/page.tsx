import Link from "next/link";
import React from "react";
import { allProjects, allBlogs } from "contentlayer/generated";

export default function Home() {
	const blogs = allBlogs
		.sort(
			(a, b) =>
				new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
		)
		.slice(0, 8);

	const projects = allProjects
		.filter((p) => p.published)
		.sort(
			(a, b) =>
				new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime(),
		)
		.slice(0, 6);

	return (
		<div className="text-xl mt-8">
			<div className="mb-8 text-3xl">
				<h1 className="xl:text-9xl md:text-7xl text-6xl font-display text-gray-200 relative -ml-2 -mb-4 xl:-ml-18 xl:-mb-12 -z-10">
					hi !
				</h1>
				<p className="text-gray-900 text-2xl sm:text-3xl lg:text-4xl tracking-tight">
					I&apos;m <span>Mohammed</span>, and I build software
					<br />
				</p>
			</div>
			<div className="text-lg text-gray-700 space-y-4">
				<p>
					I&apos;m a Cloud Engineer interested in{" "}
					<span className="font-medium">cloud infrastructure</span>,{" "}
					<span className="font-medium">AI systems</span>,{" "}
					<span className="font-medium">open source</span>, and{" "}
					<span className="font-medium">research</span> — 3X hackathon winner :)
				</p>
			</div>

			{/* Blog posts mini list */}
			<div className="mt-16">
				<h2 className="xl:text-7xl md:text-6xl text-4xl font-display text-gray-200 relative -ml-2 -mb-4 xl:-ml-18 xl:-mb-8 -z-10">
					blog
				</h2>
				<ul>
					{blogs.map((post) => (
						<li key={post.slug} className="mb-4">
							<div className="flex flex-col md:flex-row md:items-center md:gap-0 text-lg">
								<time className="w-32 text-sm text-gray-400 flex-none">
									{new Date(post.publishedAt).toLocaleDateString("en-us", {
										year: "numeric",
										month: "short",
										day: "numeric",
									})}
								</time>
								<Link
									href={`/blog/${post.slug}`}
									className="prose-link text-lg"
								>
									{post.title}
								</Link>
							</div>
						</li>
					))}
				</ul>
			</div>

			{/* Projects mini list */}
			<div className="mt-8">
				<h2 className="xl:text-7xl md:text-6xl text-4xl font-display text-gray-200 relative -ml-2 -mb-4 xl:-ml-18 xl:-mb-8 -z-10">
					projects
				</h2>
				<ul>
					{projects.map((project) => (
						<li key={project.slug} className="mb-4">
							<div className="flex flex-col md:flex-row md:items-center md:gap-0 text-lg">
								<time className="w-32 text-sm text-gray-400 flex-none">
									{project.date
										? new Date(project.date).toLocaleDateString("en-us", {
												year: "numeric",
												month: "short",
											})
										: ""}
								</time>
								<Link
									href={`/projects/${project.slug}`}
									className="prose-link text-lg"
								>
									{project.title}
								</Link>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
