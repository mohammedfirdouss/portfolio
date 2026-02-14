"use client";

import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import MagneticButton from "./magnetic-button";
import { navigationLinks } from "./navigation-links";

// Custom X (formerly Twitter) Icon component
const XIcon = ({ className }: { className?: string }) => (
	<svg viewBox="0 0 24 24" className={className} fill="currentColor">
		<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
	</svg>
);

const footerLinks = [
	{
		title: "Navigation",
		links: navigationLinks,
	},
];

const socialLinks = [
	{
		icon: Github,
		href: "https://github.com/mohammedfirdouss",
		label: "GitHub",
	},
	{
		icon: Linkedin,
		href: "https://www.linkedin.com/in/mohammedfirdousaraoye/",
		label: "LinkedIn",
	},
	{
		icon: XIcon,
		href: "https://twitter.com/iamfirdouss",
		label: "X (formerly Twitter)",
	},
	{ icon: Mail, href: "mailto:mohammedfirdous682@gmail.com", label: "Email" },
];

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="relative bg-black border-t border-zinc-800/50">
			{/* Background gradient */}
			<div className="absolute inset-0 bg-gradient-to-t from-zinc-900/50 to-transparent pointer-events-none" />

			<div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
					{/* Brand section */}
					<div className="lg:col-span-2">
						<Link href="/" className="inline-block" data-cursor="pointer">
							<h3 className="text-2xl font-display font-bold text-white hover:text-zinc-300 transition-colors duration-300">
								Mohammed Firdous
							</h3>
						</Link>
						<p className="mt-4 text-zinc-400 max-w-md leading-relaxed">
							Cloud Engineer · Builder · AI · Open Source · 3X Hackathon Winner
						</p>

						{/* Social links */}
						<div className="flex gap-4 mt-8">
							{socialLinks.map((social) => (
								<MagneticButton key={social.label} strength={0.3}>
									<Link
										href={social.href}
										target="_blank"
										rel="noopener noreferrer"
										className="group flex items-center justify-center w-10 h-10 rounded-full border border-zinc-800 hover:border-zinc-600 bg-zinc-900/50 hover:bg-zinc-800/50 transition-all duration-300"
										data-cursor="pointer"
										aria-label={social.label}
									>
										<social.icon className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors duration-300" />
									</Link>
								</MagneticButton>
							))}
						</div>
					</div>

					{/* Navigation links */}
					{footerLinks.map((section) => (
						<div key={section.title}>
							<h4 className="text-sm font-medium tracking-widest uppercase text-zinc-500 mb-6">
								{section.title}
							</h4>
							<ul className="space-y-4">
								{section.links.map((link) => (
									<li key={link.name}>
										<Link
											href={link.href}
											className="group inline-flex items-center gap-1 text-zinc-400 hover:text-white transition-colors duration-300"
											data-cursor="pointer"
										>
											<span>{link.name}</span>
											<ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}

					{/* Contact CTA */}
					<div>
						<h4 className="text-sm font-medium tracking-widest uppercase text-zinc-500 mb-6">
							Get in Touch
						</h4>
						<p className="text-zinc-400 mb-6">
							Have a project in mind? Let's work together.
						</p>
						<MagneticButton strength={0.3}>
							<Link
								href="/contact"
								className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white border border-zinc-700 rounded-full hover:border-zinc-500 hover:bg-zinc-800/50 transition-all duration-300"
								data-cursor="pointer"
							>
								Contact Me
								<ArrowUpRight className="w-4 h-4" />
							</Link>
						</MagneticButton>
					</div>
				</div>

				{/* Bottom bar */}
				<div className="mt-16 pt-8 border-t border-zinc-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
					<p className="text-sm text-zinc-500">
						© {currentYear} Mohammed Firdous. All rights reserved.
					</p>
					<div className="flex items-center gap-6">
						<span className="text-sm text-zinc-600">
							Built with Next.js & Tailwind CSS
						</span>
					</div>
				</div>
			</div>

			{/* Decorative elements */}
			<div className="absolute bottom-0 left-0 w-32 h-32 border-l border-b border-zinc-800/30 rounded-bl-3xl" />
			<div className="absolute bottom-0 right-0 w-32 h-32 border-r border-b border-zinc-800/30 rounded-br-3xl" />
		</footer>
	);
}
