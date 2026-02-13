"use client";
import { Github, Mail, Linkedin, ArrowUpRight, Sparkles } from "lucide-react";

// Custom X (formerly Twitter) Icon component
const XIcon = ({ size = 24 }: { size?: number }) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="currentColor"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
	</svg>
);
import Link from "next/link";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { motion } from "framer-motion";
import MagneticButton from "../components/magnetic-button";
import TextReveal from "../components/text-reveal";

const socials = [
	{
		icon: <Linkedin size={24} />,
		href: "https://www.linkedin.com/in/mohammedfirdousaraoye/",
		label: "LinkedIn",
		handle: "mohammedfirdousaraoye",
		color: "from-blue-500/20 to-blue-600/20",
		borderColor: "group-hover:border-blue-500/50",
	},
	{
		icon: <Mail size={24} />,
		href: "mailto:mohammedfirdous682@gmail.com",
		label: "Email",
		handle: "mohammedfirdous682@gmail.com",
		color: "from-red-500/20 to-orange-500/20",
		borderColor: "group-hover:border-red-500/50",
	},
	{
		icon: <Github size={24} />,
		href: "https://github.com/mohammedfirdouss",
		label: "Github",
		handle: "mohammedfirdouss",
		color: "from-zinc-500/20 to-zinc-600/20",
		borderColor: "group-hover:border-zinc-400/50",
	},
	null,
	{
		icon: <XIcon size={24} />,
		href: "https://twitter.com/iamfirdouss",
		label: "X",
		handle: "@iamfirdouss",
		color: "from-zinc-500/20 to-zinc-700/20",
		borderColor: "group-hover:border-zinc-400/50",
	},
];

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
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.8,
			ease: [0.21, 0.47, 0.32, 0.98],
		},
	},
};

export default function ContactPage() {
	return (
		<div className="relative min-h-screen bg-black">
			{/* Background effects */}
			<div className="absolute inset-0 bg-gradient-to-br from-zinc-900/30 via-black to-zinc-900/20" />
			<div
				className="absolute inset-0 opacity-[0.02]"
				style={{
					backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
									linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
					backgroundSize: "60px 60px",
				}}
			/>

			{/* Radial glow */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-radial from-zinc-800/30 via-transparent to-transparent rounded-full blur-3xl" />

			<Navigation />

			<div className="relative z-10 px-6 pt-24 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-32 lg:pt-40">
				{/* Header section */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
					className="max-w-2xl mx-auto lg:mx-0"
				>
					<motion.div
						initial={{ scaleX: 0 }}
						animate={{ scaleX: 1 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="h-px w-16 bg-gradient-to-r from-zinc-500 to-transparent mb-8 origin-left"
					/>
					<div className="flex items-center gap-3 mb-4">
						<Sparkles className="w-5 h-5 text-zinc-500" />
						<span className="text-sm font-medium tracking-widest uppercase text-zinc-500">
							Let's Connect
						</span>
					</div>
					<h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl font-display">
						Get in Touch
					</h1>
					<div className="mt-6 max-w-xl">
						<TextReveal
							className="text-lg text-zinc-400 leading-relaxed"
							delay={0.1}
						>
							Always open to discussing new projects, opportunities, and
							collaborations.
						</TextReveal>
					</div>
				</motion.div>

				{/* Divider */}
				<motion.div
					initial={{ scaleX: 0, opacity: 0 }}
					animate={{ scaleX: 1, opacity: 1 }}
					transition={{ duration: 1, delay: 0.5 }}
					className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"
				/>
			</div>

			{/* Social cards */}
			<div className="relative z-10 container px-6 mx-auto py-20 lg:px-8">
				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
				>
					{socials.map((s, index) =>
						s ? (
							<motion.div key={index} variants={itemVariants}>
								<MagneticButton strength={0.1} className="w-full h-full">
									<Card>
										<Link
											href={s.href}
											target="_blank"
											className={
												"relative flex flex-col items-center gap-6 p-8 md:p-12 group transition-all duration-500"
											}
											data-cursor="pointer"
											data-cursor-text="Visit"
										>
											{/* Background gradient on hover */}
											<div
												className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}
											/>

											{/* Decorative line */}
											<span
												className="absolute w-px h-1/2 bg-gradient-to-b from-zinc-600 via-zinc-600/50 to-transparent top-0"
												aria-hidden="true"
											/>

											{/* Icon */}
											<motion.span
												className={`relative z-10 flex items-center justify-center w-16 h-16 text-zinc-400 group-hover:text-white border ${s.borderColor} border-zinc-700 rounded-2xl bg-zinc-900/50 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:shadow-glow-sm`}
												whileHover={{ rotate: [0, -10, 10, 0] }}
												transition={{ duration: 0.5 }}
											>
												{s.icon}
											</motion.span>

											{/* Content */}
											<div className="z-10 flex flex-col items-center text-center">
												<span className="text-xs font-medium tracking-widest uppercase text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300">
													{s.label}
												</span>
												<span className="mt-2 text-xl font-medium text-zinc-200 group-hover:text-white font-display transition-colors duration-300 flex items-center gap-2">
													{s.handle}
													<ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
												</span>
											</div>
										</Link>
									</Card>
								</MagneticButton>
							</motion.div>
						) : (
							<div key={index} className="hidden lg:block" />
						),
					)}
				</motion.div>
			</div>

			{/* Bottom CTA */}
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 1 }}
				className="relative z-10 pb-20 text-center"
			>
				<p className="text-zinc-500 mb-4">Prefer a direct conversation?</p>
				<MagneticButton strength={0.3}>
					<Link
						href="mailto:mohammedfirdous682@gmail.com"
						className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium text-black bg-white rounded-full transition-transform duration-300 hover:scale-105"
						data-cursor="pointer"
					>
						<Mail className="w-4 h-4" />
						Send me an email
					</Link>
				</MagneticButton>
			</motion.div>

			{/* Corner decorations */}
			<div className="absolute top-24 left-8 w-24 h-24 border-l border-t border-zinc-800/50 rounded-tl-3xl" />
			<div className="absolute top-24 right-8 w-24 h-24 border-r border-t border-zinc-800/50 rounded-tr-3xl" />
		</div>
	);
}
