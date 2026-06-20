"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { type Project } from "contentlayer/generated";

export function ProjectList({ projects }: { projects: Project[] }) {
	const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
	const lastProjectRef = useRef<Project | null>(null);

	const hovered = projects.find((p) => p.slug === hoveredSlug) ?? null;
	if (hovered) lastProjectRef.current = hovered;
	const preview = hovered ?? lastProjectRef.current;

	return (
		<div onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}>
			{projects.map((project) => (
				<div
					key={project.slug}
					className="my-8 mt-12 sm:mt-16 sm:mb-12"
					onMouseEnter={() => setHoveredSlug(project.slug)}
					onMouseLeave={() => setHoveredSlug(null)}
				>
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
					<div className="text-lg text-gray-500 mt-2">{project.description}</div>
				</div>
			))}

			<div
				className={`fixed z-50 pointer-events-none transition-all duration-200 ${
					hovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
				}`}
				style={{ left: mousePos.x + 24, top: mousePos.y - 80 }}
			>
				{preview?.banner ? (
					<img
						src={preview.banner}
						alt={preview.title}
						className="w-72 h-44 object-cover rounded-xl shadow-xl border border-gray-100"
					/>
				) : preview ? (
					<div className="w-64 rounded-xl shadow-xl border border-gray-100 bg-white p-4">
						<p className="text-sm font-semibold text-gray-900">{preview.title}</p>
						<p className="text-xs text-gray-500 mt-1 line-clamp-3">
							{preview.description}
						</p>
					</div>
				) : null}
			</div>
		</div>
	);
}
