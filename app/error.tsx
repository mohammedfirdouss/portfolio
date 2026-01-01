"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Navigation } from "./components/nav";
import { motion } from "framer-motion";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log error to console in development
		if (process.env.NODE_ENV === "development") {
			console.error("Error:", error);
		}
	}, [error]);

	return (
		<div className="relative min-h-screen bg-black">
			{/* Background effects */}
			<div className="absolute inset-0 bg-gradient-to-br from-zinc-900/30 via-black to-zinc-900/20" />
			<div 
				className="absolute inset-0 opacity-[0.02]"
				style={{
					backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
									linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
					backgroundSize: '60px 60px',
				}}
			/>
			
			{/* Radial glow */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-radial from-zinc-800/30 via-transparent to-transparent rounded-full blur-3xl" />
			
			<Navigation />
			
			<div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="max-w-2xl"
				>
					<motion.div
						initial={{ scaleX: 0 }}
						animate={{ scaleX: 1 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="h-px w-16 bg-gradient-to-r from-zinc-500 to-transparent mb-8 mx-auto origin-center"
					/>
					
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						className="text-4xl md:text-6xl font-display font-bold text-white mb-6"
					>
						Something went wrong
					</motion.h1>
					
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.6 }}
						className="text-lg text-zinc-400 mb-8"
					>
						An unexpected error occurred. Please try again.
					</motion.p>
					
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.8 }}
						className="flex flex-col sm:flex-row gap-4 justify-center"
					>
						<button
							onClick={reset}
							className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium text-black bg-white rounded-full transition-transform duration-300 hover:scale-105"
						>
							Try again
						</button>
						<Link
							href="/"
							className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium text-white border border-zinc-700 rounded-full transition-all duration-300 hover:border-zinc-500 hover:scale-105"
						>
							Go back home
						</Link>
					</motion.div>
				</motion.div>
			</div>
			
			{/* Corner decorations */}
			<div className="absolute top-24 left-8 w-24 h-24 border-l border-t border-zinc-800/50 rounded-tl-3xl" />
			<div className="absolute top-24 right-8 w-24 h-24 border-r border-t border-zinc-800/50 rounded-tr-3xl" />
		</div>
	);
}
