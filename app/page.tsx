"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import Particles from "./components/particles";
import MagneticButton from "./components/magnetic-button";
import { TechStack } from "./components/tech-stack";
import { SelectedProjects } from "./components/selected-projects";
import { HackerText } from "./components/hacker-text";
import { navigationLinks as navigation } from "./components/navigation-links";

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.3,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.8,
			ease: [0.21, 0.47, 0.32, 0.98],
		},
	},
};

export default function Home() {
	return (
		<div className="relative w-full bg-black">
			{/* Hero Section */}
			<section className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
				{/* Gradient background */}
				<div className="absolute inset-0 bg-gradient-to-br from-zinc-900/50 via-black to-zinc-900/30" />

				{/* Grid pattern overlay */}
				<div
					className="absolute inset-0 opacity-[0.02]"
					style={{
						backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
						backgroundSize: "100px 100px",
					}}
				/>

				{/* Radial glow */}
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-zinc-800/20 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

				<Particles
					className="absolute inset-0 -z-10 pointer-events-none"
					quantity={80}
					staticity={30}
					ease={80}
				/>

				{/* Navigation */}
				<motion.nav
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-6 md:py-6"
				>
					<ul className="flex items-center justify-center flex-wrap gap-1 md:gap-4 lg:gap-6">
						{navigation.map((item) => (
							<motion.li key={item.href} variants={itemVariants}>
								<MagneticButton strength={0.3}>
									<Link
										href={item.href}
										className="relative px-3 py-2 md:px-4 md:py-2.5 text-xs md:text-sm font-medium text-zinc-400 transition-all duration-300 ease-out hover:text-white group"
										data-cursor="pointer"
										data-cursor-text="View"
									>
										<span className="relative z-10">{item.name}</span>
										<span className="absolute inset-0 rounded-full bg-zinc-800/0 group-hover:bg-zinc-800/50 transition-all duration-300 ease-out" />
									</Link>
								</MagneticButton>
							</motion.li>
						))}
						{/* Command Palette Hint */}
						<motion.li variants={itemVariants}>
							<button
								onClick={() => {
									const event = new KeyboardEvent("keydown", {
										key: "k",
										metaKey: true,
									});
									window.dispatchEvent(event);
								}}
								className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-500 bg-zinc-900/50 border border-zinc-800 rounded-lg hover:text-zinc-300 hover:border-zinc-700 transition-all duration-300 ease-out"
								data-cursor="pointer"
							>
								<svg
									className="w-3 h-3"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
									/>
								</svg>
								<span>⌘K</span>
							</button>
						</motion.li>
					</ul>
				</motion.nav>

				{/* Main content */}
				<div className="relative z-10 flex flex-col items-center justify-center px-6 pt-32 md:pt-40 text-center">
					{/* Decorative line */}
					<motion.div
						initial={{ scaleX: 0, opacity: 0 }}
						animate={{ scaleX: 1, opacity: 1 }}
						transition={{
							duration: 1.5,
							delay: 0.5,
							ease: [0.21, 0.47, 0.32, 0.98],
						}}
						className="w-24 h-px mb-12 bg-gradient-to-r from-transparent via-zinc-500 to-transparent"
					/>

					{/* Eyebrow text */}
					<motion.span
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.6 }}
						className="mb-6 text-xs md:text-sm font-medium tracking-[0.3em] uppercase text-zinc-400"
					>
						Cloud Engineer · Builder · AI · Open Source · 3X Hackathon Winner
					</motion.span>

					{/* Main heading */}
					<motion.h1
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 1,
							delay: 0.8,
							ease: [0.21, 0.47, 0.32, 0.98],
						}}
						className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold text-white tracking-tight"
					>
						<HackerText text="Mohammed" /> <HackerText text="Firdous" />
					</motion.h1>

					{/* Decorative line */}
					<motion.div
						initial={{ scaleX: 0, opacity: 0 }}
						animate={{ scaleX: 1, opacity: 1 }}
						transition={{
							duration: 1.5,
							delay: 1,
							ease: [0.21, 0.47, 0.32, 0.98],
						}}
						className="w-48 h-px my-12 bg-gradient-to-r from-transparent via-zinc-600 to-transparent"
					/>

					{/* CTA Buttons */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 1.6 }}
						className="flex flex-col sm:flex-row gap-4 mt-12"
					>
						<MagneticButton strength={0.4}>
							<Link
								href="/projects"
								className="group relative inline-flex items-center justify-center px-8 py-4 text-sm font-medium text-black bg-white rounded-full overflow-hidden transition-transform duration-300 hover:scale-105"
								data-cursor="pointer"
							>
								<span className="relative z-10">View Projects</span>
								<span className="absolute inset-0 bg-gradient-to-r from-zinc-200 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
							</Link>
						</MagneticButton>

						<MagneticButton strength={0.4}>
							<Link
								href="/contact"
								className="group relative inline-flex items-center justify-center px-8 py-4 text-sm font-medium text-white border border-zinc-700 rounded-full overflow-hidden transition-all duration-300 hover:border-zinc-500 hover:scale-105"
								data-cursor="pointer"
							>
								<span className="relative z-10">Get in Touch</span>
								<span className="absolute inset-0 bg-zinc-800/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
							</Link>
						</MagneticButton>
					</motion.div>
				</div>

				{/* Corner decorations */}
				<div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-zinc-800 opacity-50" />
				<div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-zinc-800 opacity-50" />
				<div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-zinc-800 opacity-50" />
				<div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-zinc-800 opacity-50" />
			</section>

			{/* Selected Projects Section */}
			<SelectedProjects />

			{/* Tech Stack Section */}
			<TechStack />

			{/* Footer CTA Section */}
			<section className="relative py-24 md:py-32">
				<div className="absolute inset-0 bg-gradient-to-t from-zinc-900/50 to-transparent" />
				<div className="relative max-w-4xl mx-auto px-6 text-center">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-display mb-6">
							Got a project in mind?
						</h2>
						<p className="text-lg text-zinc-300 mb-8 max-w-2xl mx-auto">
							Let&apos;s talk about it. I build cloud infrastructure, automation
							solutions, and web applications.
						</p>
						<MagneticButton strength={0.4}>
							<Link
								href="/contact"
								className="group relative inline-flex items-center justify-center px-8 py-4 text-sm font-medium text-black bg-white rounded-full overflow-hidden transition-transform duration-300 hover:scale-105"
								data-cursor="pointer"
							>
								<span className="relative z-10">Start a Conversation</span>
								<span className="absolute inset-0 bg-gradient-to-r from-zinc-200 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
							</Link>
						</MagneticButton>
					</motion.div>
				</div>

				{/* Gradient divider */}
				<div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
			</section>
		</div>
	);
}
