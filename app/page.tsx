import Link from "next/link";
import React from "react";
import {
	allProjects,
	allBlogs,
	allTalks,
	allOpenSources,
} from "contentlayer/generated";

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

	const openSource = allOpenSources
		.filter((c) => c.published !== false)
		.sort(
			(a, b) =>
				new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime(),
		)
		.slice(0, 3);

	const talks = allTalks
		.filter((t) => t.published !== false)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.slice(0, 3);

	return (
		<div className="text-xl mt-8">
			<div className="mb-8 text-3xl">
				<h1 className="xl:text-9xl md:text-7xl text-6xl font-display text-gray-200 relative -ml-2 -mb-4 xl:-ml-18 xl:-mb-12 -z-10">
					hi !
				</h1>
				<p className="text-gray-900 text-2xl sm:text-3xl lg:text-4xl tracking-tight">
					I&apos;m <span>Mohammed Firdous</span>, and I build software
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
				<div className="mt-3">
					<Link href="/blog" className="text-sm text-sky-600 hover:underline">
						View all →
					</Link>
				</div>
			</div>

			{/* Projects mini list */}
			<div className="border-t border-gray-100 pt-12 mt-12">
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
				<div className="mt-3">
					<Link
						href="/projects"
						className="text-sm text-sky-600 hover:underline"
					>
						View all →
					</Link>
				</div>
			</div>

			{/* Open source mini list */}
			<div className="border-t border-gray-100 pt-8 mt-8">
				<h2 className="xl:text-7xl md:text-6xl text-4xl font-display text-gray-200 relative -ml-2 -mb-4 xl:-ml-18 xl:-mb-8 -z-10">
					open source
				</h2>
				<ul>
					{openSource.map((contrib) => (
						<li key={contrib.slug} className="mb-4">
							<div className="flex flex-col md:flex-row md:items-center md:gap-0 text-lg">
								<time className="w-32 text-sm text-gray-400 flex-none">
									{contrib.date
										? new Date(contrib.date).toLocaleDateString("en-us", {
												year: "numeric",
												month: "short",
										  })
										: ""}
								</time>
								<Link
									href={`/open-source/${contrib.slug}`}
									className="prose-link text-lg"
								>
									{contrib.title}
								</Link>
							</div>
						</li>
					))}
				</ul>
				<div className="mt-3">
					<Link
						href="/open-source"
						className="text-sm text-sky-600 hover:underline"
					>
						View all →
					</Link>
				</div>
			</div>

			{/* Talks mini list */}
			<div className="border-t border-gray-100 pt-8 mt-8">
				<h2 className="xl:text-7xl md:text-6xl text-4xl font-display text-gray-200 relative -ml-2 -mb-4 xl:-ml-18 xl:-mb-8 -z-10">
					talks
				</h2>
				<ul>
					{talks.map((talk) => (
						<li key={talk.slug} className="mb-4">
							<div className="flex flex-col md:flex-row md:items-center md:gap-0 text-lg">
								<time className="w-32 text-sm text-gray-400 flex-none">
									{new Date(talk.date).toLocaleDateString("en-us", {
										year: "numeric",
										month: "short",
									})}
								</time>
								<Link
									href={`/talks/${talk.slug}`}
									className="prose-link text-lg"
								>
									{talk.title}
								</Link>
							</div>
						</li>
					))}
				</ul>
				<div className="mt-3">
					<Link href="/talks" className="text-sm text-sky-600 hover:underline">
						View all →
					</Link>
				</div>
			</div>
		</div>
	);
}
