"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

interface BackToTopProps {
	threshold?: number;
}

export function BackToTop({ threshold = 400 }: BackToTopProps) {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const toggleVisibility = () => {
			setIsVisible(window.scrollY > threshold);
		};

		window.addEventListener("scroll", toggleVisibility);
		return () => window.removeEventListener("scroll", toggleVisibility);
	}, [threshold]);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.button
					initial={{ opacity: 0, scale: 0.8, y: 20 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.8, y: 20 }}
					transition={{ duration: 0.2, ease: "easeOut" }}
					onClick={scrollToTop}
					className="fixed bottom-6 right-6 z-50 p-3 bg-zinc-900/90 border border-zinc-800 rounded-full backdrop-blur-sm hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-200 group shadow-lg shadow-black/20"
					aria-label="Back to top"
				>
					<ArrowUp className="w-5 h-5 text-zinc-400 group-hover:text-zinc-100 transition-colors" />

					{/* Pulse ring effect */}
					<span className="absolute inset-0 rounded-full border border-zinc-700/50 animate-ping opacity-20" />
				</motion.button>
			)}
		</AnimatePresence>
	);
}
