"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFoundContent() {
	return (
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
					className="text-6xl md:text-8xl font-display font-bold text-white mb-6"
				>
					404
				</motion.h1>
				
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.6 }}
					className="text-xl text-zinc-400 mb-8"
				>
					Page not found
				</motion.p>
				
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.8 }}
					className="text-base text-zinc-500 mb-12 max-w-md mx-auto"
				>
					The page you're looking for doesn't exist or has been moved.
				</motion.p>
				
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 1 }}
				>
					<Link
						href="/"
						className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium text-black bg-white rounded-full transition-transform duration-300 hover:scale-105"
					>
						Go back home
					</Link>
				</motion.div>
			</motion.div>
		</div>
	);
}
