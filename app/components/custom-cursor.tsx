"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
	const [isHydrated, setIsHydrated] = useState(false);
	const [isHovering, setIsHovering] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [cursorText, setCursorText] = useState("");
	const cursorRef = useRef<HTMLDivElement>(null);

	const cursorX = useMotionValue(-100);
	const cursorY = useMotionValue(-100);

	const springConfig = { damping: 25, stiffness: 700 };
	const cursorXSpring = useSpring(cursorX, springConfig);
	const cursorYSpring = useSpring(cursorY, springConfig);

	useEffect(() => {
		setIsHydrated(true);
	}, []);

	useEffect(() => {
		if (!isHydrated) return;

		const moveCursor = (e: MouseEvent) => {
			cursorX.set(e.clientX);
			cursorY.set(e.clientY);
			setIsVisible(true);
		};

		const handleMouseOver = (e: MouseEvent) => {
			const target = e.target as HTMLElement;

			if (
				target.tagName === "A" ||
				target.tagName === "BUTTON" ||
				target.closest("a") ||
				target.closest("button") ||
				target.dataset.cursor === "pointer"
			) {
				setIsHovering(true);
				setCursorText(target.dataset.cursorText || "");
			}
		};

		const handleMouseOut = () => {
			setIsHovering(false);
			setCursorText("");
		};

		const handleMouseLeave = () => {
			setIsVisible(false);
		};

		window.addEventListener("mousemove", moveCursor);
		document.addEventListener("mouseover", handleMouseOver);
		document.addEventListener("mouseout", handleMouseOut);
		document.addEventListener("mouseleave", handleMouseLeave);

		return () => {
			window.removeEventListener("mousemove", moveCursor);
			document.removeEventListener("mouseover", handleMouseOver);
			document.removeEventListener("mouseout", handleMouseOut);
			document.removeEventListener("mouseleave", handleMouseLeave);
		};
	}, [isHydrated, cursorX, cursorY]);

	if (!isHydrated) return null;

	return (
		<>
			{/* Main cursor dot */}
			<motion.div
				ref={cursorRef}
				className="fixed top-0 left-0 pointer-events-none z-[99] mix-blend-difference"
				style={{
					x: cursorXSpring,
					y: cursorYSpring,
				}}
			>
				<motion.div
					className="relative flex items-center justify-center"
					animate={{
						scale: isHovering ? 2.5 : 1,
					}}
					transition={{ duration: 0.2 }}
				>
					<div
						className={`rounded-full bg-white transition-all duration-200 ${
							isHovering ? "w-12 h-12 -ml-6 -mt-6" : "w-3 h-3 -ml-1.5 -mt-1.5"
						}`}
					/>
					{cursorText && isHovering && (
						<span className="absolute text-xs font-medium text-black whitespace-nowrap">
							{cursorText}
						</span>
					)}
				</motion.div>
			</motion.div>

			{/* Cursor ring/outline */}
			<motion.div
				className="fixed top-0 left-0 pointer-events-none z-[98]"
				style={{
					x: cursorXSpring,
					y: cursorYSpring,
				}}
			>
				<motion.div
					className="w-10 h-10 -ml-5 -mt-5 rounded-full border border-white/30"
					animate={{
						scale: isHovering ? 1.5 : 1,
						opacity: isVisible ? 0.5 : 0,
					}}
					transition={{ duration: 0.3 }}
				/>
			</motion.div>

			{/* Hide default cursor globally */}
			<style jsx global>{`
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
		</>
	);
}
