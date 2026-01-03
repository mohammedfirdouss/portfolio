"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./magnetic-button";

const navItems = [
	{ name: "Experience", href: "/experience" },
	{ name: "Certifications", href: "/certifications" },
	{ name: "Projects", href: "/projects" },
	{ name: "Blog", href: "/blog" },
	{ name: "Open Source", href: "/open-source" },
	{ name: "Diagrams", href: "/diagrams" },
	{ name: "Uses", href: "/uses" },
	{ name: "Contact", href: "/contact" },
];

export const Navigation: React.FC<{ backLink?: string }> = ({ backLink }) => {
	const ref = useRef<HTMLElement>(null);
	const [isIntersecting, setIntersecting] = useState(true);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting),
		);

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	// Close mobile menu on route change
	useEffect(() => {
		setIsMobileMenuOpen(false);
	}, []);

	return (
		<header ref={ref}>
			<motion.div
				initial={{ y: -100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
				className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
					isIntersecting
						? "bg-transparent border-transparent"
						: "bg-zinc-900/80 backdrop-blur-xl border-zinc-800/50"
				} border-b`}
			>
				<div className="container flex items-center justify-between p-4 md:p-6 mx-auto">
					{/* Back button */}
					<MagneticButton strength={0.3}>
						<Link
							href={backLink || "/"}
							className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors duration-300"
							data-cursor="pointer"
						>
							<motion.div whileHover={{ x: -4 }} transition={{ duration: 0.2 }}>
								<ArrowLeft className="w-5 h-5" />
							</motion.div>
							<span className="text-sm font-medium hidden sm:inline-block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
								Back
							</span>
						</Link>
					</MagneticButton>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center gap-1">
						{navItems.map((item, index) => (
							<motion.div
								key={item.href}
								initial={{ opacity: 0, y: -20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.5,
									delay: index * 0.1,
									ease: [0.21, 0.47, 0.32, 0.98],
								}}
							>
								<MagneticButton strength={0.2}>
									<Link
										href={item.href}
										className="relative px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-all duration-300 ease-out group"
										data-cursor="pointer"
									>
										<span className="relative z-10">{item.name}</span>
										<motion.span
											className="absolute inset-0 rounded-full bg-zinc-800/50"
											initial={{ scale: 0, opacity: 0 }}
											whileHover={{ scale: 1, opacity: 1 }}
											transition={{ duration: 0.2 }}
										/>
									</Link>
								</MagneticButton>
							</motion.div>
						))}
					</nav>

					{/* Mobile Menu Button */}
					<button
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						className="md:hidden relative w-10 h-10 flex items-center justify-center"
						data-cursor="pointer"
					>
						<div className="flex flex-col gap-1.5">
							<motion.span
								animate={{
									rotate: isMobileMenuOpen ? 45 : 0,
									y: isMobileMenuOpen ? 8 : 0,
								}}
								className="w-6 h-0.5 bg-zinc-400 origin-center transition-colors"
							/>
							<motion.span
								animate={{
									opacity: isMobileMenuOpen ? 0 : 1,
									scaleX: isMobileMenuOpen ? 0 : 1,
								}}
								className="w-6 h-0.5 bg-zinc-400"
							/>
							<motion.span
								animate={{
									rotate: isMobileMenuOpen ? -45 : 0,
									y: isMobileMenuOpen ? -8 : 0,
								}}
								className="w-6 h-0.5 bg-zinc-400 origin-center"
							/>
						</div>
					</button>
				</div>
			</motion.div>

			{/* Mobile Menu */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "100vh" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
						className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden flex items-center justify-center"
					>
						<nav className="flex flex-col items-center gap-8">
							{navItems.map((item, index) => (
								<motion.div
									key={item.href}
									initial={{ opacity: 0, y: 30 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 30 }}
									transition={{
										duration: 0.4,
										delay: index * 0.1,
										ease: [0.21, 0.47, 0.32, 0.98],
									}}
								>
									<Link
										href={item.href}
										onClick={() => setIsMobileMenuOpen(false)}
										className="text-3xl font-display font-bold text-zinc-400 hover:text-white transition-all duration-300 ease-out"
										data-cursor="pointer"
									>
										{item.name}
									</Link>
								</motion.div>
							))}
						</nav>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
};
