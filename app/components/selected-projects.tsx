"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Eye, Github } from "lucide-react";
import { allProjects } from "contentlayer/generated";
import { Card } from "./card";

export function SelectedProjects() {
	// Sort projects by date descending
	const sortedProjects = [...allProjects].sort(
		(a, b) =>
			new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
			new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
	);

	// Select specific projects to feature
	// Try to find "Cruddur" as featured, otherwise take the most recent one
	const featured =
		sortedProjects.find((p) => p.slug === "cruddur") || sortedProjects[0];

	// Take the next 2 projects that aren't the featured one
	const secondary = sortedProjects
		.filter((p) => p.slug !== featured?.slug)
		.slice(0, 2);

	return (
		<section className="relative py-24 md:py-32 w-full">
			<div className="max-w-7xl mx-auto px-6 lg:px-8">
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
				>
					<div>
						<h2 className="text-3xl md:text-5xl font-bold text-white font-display tracking-tight">
							Selected Work
						</h2>
						<p className="mt-4 text-lg text-zinc-400 max-w-xl leading-relaxed">
							A glimpse into my portfolio of cloud infrastructure, automation,
							and full-stack applications.
						</p>
					</div>

					<Link
						href="/projects"
						className="group flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
					>
						View all projects
						<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
					</Link>
				</motion.div>

				{/* Projects Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Featured Project - Large Card */}
					{featured && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.1 }}
							className="lg:row-span-2"
						>
							<Card>
								<Link href={`/projects/${featured.slug}`} className="group block h-full">
									<div className="flex flex-col h-full min-h-[400px] lg:min-h-[600px]">
										<div className="relative flex-grow overflow-hidden rounded-t-2xl">
											<Image
												src={featured.banner || featured.screenshot || "/placeholder.png"}
												alt={featured.title}
												fill
												className="object-cover transition-transform duration-700 group-hover:scale-105"
											/>
											<div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
										</div>
										<div className="relative p-8 -mt-20 z-10">
											<span className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-medium text-emerald-300 bg-emerald-950/30 border border-emerald-900/50 rounded-full backdrop-blur-sm">
												<span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
												Featured Project
											</span>
											<h3 className="text-3xl font-bold text-white font-display mb-3 group-hover:text-emerald-400 transition-colors">
												{featured.title}
											</h3>
											<p className="text-zinc-400 line-clamp-3 mb-6">
												{featured.description}
											</p>
											<div className="flex items-center gap-4 text-sm font-medium text-zinc-300">
												<span className="flex items-center gap-2 group-hover:text-emerald-400 transition-colors">
													Read Case Study <ArrowRight className="w-4 h-4" />
												</span>
											</div>
										</div>
									</div>
								</Link>
							</Card>
						</motion.div>
					)}

					{/* Secondary Projects - Smaller Cards */}
					<div className="flex flex-col gap-8">
						{secondary.map((project, index) => (
							<motion.div
								key={project.slug}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
							>
								<Card>
									<Link href={`/projects/${project.slug}`} className="group block h-full">
										<div className="flex flex-col md:flex-row h-full">
											<div className="relative w-full md:w-2/5 h-48 md:h-auto overflow-hidden">
												<Image
													src={project.banner || project.screenshot || "/placeholder.png"}
													alt={project.title}
													fill
													className="object-cover transition-transform duration-700 group-hover:scale-105"
												/>
												<div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-zinc-950/80 via-transparent to-transparent" />
											</div>
											<div className="flex-1 p-6 flex flex-col justify-center">
												<h3 className="text-xl font-bold text-white font-display mb-2 group-hover:text-emerald-400 transition-colors">
													{project.title}
												</h3>
												<p className="text-sm text-zinc-400 line-clamp-2 mb-4">
													{project.description}
												</p>
												<span className="text-sm font-medium text-zinc-500 group-hover:text-zinc-300 transition-colors">
													View Details &rarr;
												</span>
											</div>
										</div>
									</Link>
								</Card>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
