"use client";
import {
	ArrowLeft,
	Eye,
	Github,
	Globe,
	ArrowUpRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Props = {
	project: {
		url?: string;
		title: string;
		description: string;
		repository?: string;
		banner?: string;
		screenshot?: string;
	};
	views: number;
};

export const Header: React.FC<Props> = ({ project, views }) => {
	const ref = useRef<HTMLElement>(null);
	const [isIntersecting, setIntersecting] = useState(true);

	const { scrollY } = useScroll();
	const y = useTransform(scrollY, [0, 500], [0, 150]);
	const opacity = useTransform(scrollY, [0, 300], [1, 0]);

	const links: { label: string; href: string; icon: React.ReactNode }[] = [];
	if (project.repository) {
		links.push({
			label: "GitHub",
			href: `https://github.com/${project.repository}`,
			icon: <Github className="w-4 h-4" />,
		});
	}
	if (project.url) {
		links.push({
			label: "Website",
			href: project.url,
			icon: <Globe className="w-4 h-4" />,
		});
	}

	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting),
		);

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	const image = project.banner || project.screenshot;

	return (
		<header
			ref={ref}
			className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden bg-black"
		>
			{/* Navigation Overlay */}
			<div
				className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 border-b ${
					isIntersecting
						? "bg-transparent border-transparent py-6"
						: "bg-black/80 backdrop-blur-xl border-zinc-800 py-4"
				}`}
			>
				<div className="container flex items-center justify-between px-6 mx-auto">
					<Link
						href="/projects"
						className={`flex items-center gap-2 text-sm font-medium transition-colors ${
							isIntersecting
								? "text-zinc-300 hover:text-white"
								: "text-zinc-400 hover:text-white"
						}`}
					>
						<ArrowLeft className="w-5 h-5" />
						<span>Back to Projects</span>
					</Link>

					<div className="flex items-center gap-6">
						<span className="flex items-center gap-2 text-sm text-zinc-400">
							<Eye className="w-4 h-4" />
							{Intl.NumberFormat("en-US", { notation: "compact" }).format(
								views,
							)}
						</span>

						{links.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								target="_blank"
								className="text-zinc-400 hover:text-white transition-colors"
							>
								{link.icon}
							</Link>
						))}
					</div>
				</div>
			</div>

			{/* Immersive Background Image */}
			{image && (
				<motion.div className="absolute inset-0 z-0" style={{ y, scale: 1.1 }}>
					<Image
						src={image}
						alt={project.title}
						fill
						priority
						className="object-cover opacity-50"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-black/40" />
					<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/60" />
				</motion.div>
			)}

			{/* Content */}
			<motion.div
				className="relative z-10 container px-6 mx-auto text-center"
				style={{ opacity }}
			>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="max-w-4xl mx-auto space-y-8"
				>
					<h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white font-display">
						{project.title}
					</h1>

					<p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed">
						{project.description}
					</p>

					{/* Action Buttons */}
					<div className="flex flex-wrap items-center justify-center gap-4 pt-4">
						{links.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								target="_blank"
								className="group relative inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full text-sm font-medium hover:bg-zinc-200 transition-all duration-300 hover:scale-105"
							>
								{link.label}
								{link.label === "Website" ? (
									<ArrowUpRight className="w-4 h-4" />
								) : (
									link.icon
								)}
							</Link>
						))}
					</div>
				</motion.div>
			</motion.div>

			{/* Scroll Indicator */}
			<motion.div
				className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
				animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
				transition={{ duration: 2, repeat: Infinity }}
			>
				<div className="w-6 h-10 border-2 border-zinc-500 rounded-full flex justify-center p-2">
					<div className="w-1 h-1.5 bg-zinc-300 rounded-full" />
				</div>
			</motion.div>
		</header>
	);
};
