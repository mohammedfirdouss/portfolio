"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Info, Maximize2, X } from "lucide-react";
import Image from "next/image";

interface InteractiveDiagramProps {
	src: string;
	alt: string;
	title?: string;
	description?: string;
}

export function InteractiveDiagram({
	src,
	alt,
	title,
	description,
}: InteractiveDiagramProps) {
	const [isExpanded, setIsExpanded] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	return (
		<>
			<div
				className="relative my-8 group cursor-zoom-in"
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				onClick={() => setIsExpanded(true)}
			>
				<div className="relative rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900/50 w-full h-auto">
					{/* Overlay gradient */}
					<div
						className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 ${
							isHovered ? "opacity-100" : ""
						}`}
					/>

					<Image
						src={src}
						alt={alt}
						width={1600}
						height={900}
						className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
						priority={false}
					/>

					{/* Interactive hints */}
					<div
						className={`absolute bottom-4 left-4 right-4 flex items-center justify-between transition-all duration-300 transform ${
							isHovered
								? "translate-y-0 opacity-100"
								: "translate-y-4 opacity-0"
						}`}
					>
						<div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs text-white">
							<Info className="w-3 h-3 text-emerald-400" />
							<span>Click to explore details</span>
						</div>
						<div className="p-2 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white">
							<Maximize2 className="w-4 h-4" />
						</div>
					</div>
				</div>

				{/* Caption */}
				{(title || description) && (
					<div className="mt-3 flex flex-col gap-1 px-1">
						{title && (
							<span className="text-sm font-medium text-zinc-200">{title}</span>
						)}
						{description && (
							<span className="text-xs text-zinc-500 italic">
								{description}
							</span>
						)}
					</div>
				)}
			</div>

			{/* Expanded Modal View */}
			{isExpanded && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8"
					onClick={() => setIsExpanded(false)}
				>
					<div className="relative w-full max-w-7xl max-h-screen overflow-auto flex flex-col items-center">
						<button
							onClick={(e) => {
								e.stopPropagation();
								setIsExpanded(false);
							}}
							className="absolute top-4 right-4 z-50 p-2 rounded-full bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
						>
							<X className="w-6 h-6" />
						</button>

						<motion.div
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ type: "spring", damping: 25, stiffness: 300 }}
							className="relative w-full h-full"
							onClick={(e) => e.stopPropagation()}
						>
							<Image
								src={src}
								alt={alt}
								width={1920}
								height={1080}
								className="w-full h-auto object-contain rounded-lg shadow-2xl"
							/>

							{/* Contextual overlay in modal */}
							<div className="mt-6 max-w-2xl mx-auto text-center">
								<h3 className="text-2xl font-bold text-white mb-2">
									{title || alt}
								</h3>
								<p className="text-zinc-400">
									{description || "Interactive architecture diagram view."}
								</p>
							</div>
						</motion.div>
					</div>
				</motion.div>
			)}
		</>
	);
}
