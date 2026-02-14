"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
	const [isHydrated, setIsHydrated] = useState(false);
	const [isHovering, setIsHovering] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
	const cursorX = useMotionValue(-100);
	const cursorY = useMotionValue(-100);

	// Tight spring for the dot (near-instant)
	const dotConfig = { damping: 40, stiffness: 600, mass: 0.2 };
	const dotXSpring = useSpring(cursorX, dotConfig);
	const dotYSpring = useSpring(cursorY, dotConfig);

	// Looser spring for the trailing crosshair arms
	const trailConfig = { damping: 25, stiffness: 280, mass: 0.4 };
	const trailXSpring = useSpring(cursorX, trailConfig);
	const trailYSpring = useSpring(cursorY, trailConfig);

	useEffect(() => {
		setIsHydrated(true);
		setPrefersReducedMotion(
			window.matchMedia("(prefers-reduced-motion: reduce)").matches,
		);
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
				target.dataset.cursor === "pointer" ||
				window.getComputedStyle(target).cursor === "pointer"
			) {
				setIsHovering(true);
			}
		};

		const handleMouseOut = () => {
			setIsHovering(false);
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

	if (!isHydrated || prefersReducedMotion) return null;

	return (
		<>
			{/* Center dot - small, precise */}
			<motion.div
				className="fixed top-0 left-0 pointer-events-none z-[999] mix-blend-difference"
				style={{
					x: dotXSpring,
					y: dotYSpring,
					opacity: isVisible ? 1 : 0,
				}}
			>
				<motion.div
					className="absolute rounded-full bg-white"
					animate={{
						width: isHovering ? 6 : 4,
						height: isHovering ? 6 : 4,
						top: isHovering ? -3 : -2,
						left: isHovering ? -3 : -2,
					}}
					transition={{ duration: 0.2, ease: "easeOut" }}
				/>
			</motion.div>

			{/* Crosshair arms - trailing, minimal */}
			<motion.div
				className="fixed top-0 left-0 pointer-events-none z-[998] mix-blend-difference"
				style={{
					x: trailXSpring,
					y: trailYSpring,
					opacity: isVisible ? 1 : 0,
				}}
			>
				{/* Horizontal arms */}
				<motion.div
					className="absolute bg-white/60"
					animate={{
						width: isHovering ? 20 : 14,
						height: 1,
						top: -0.5,
						left: isHovering ? -10 : -7,
						opacity: isHovering ? 0.9 : 0.5,
					}}
					transition={{ duration: 0.25, ease: "easeOut" }}
					style={{ transformOrigin: "center" }}
				/>
				{/* Vertical arms */}
				<motion.div
					className="absolute bg-white/60"
					animate={{
						width: 1,
						height: isHovering ? 20 : 14,
						left: -0.5,
						top: isHovering ? -10 : -7,
						opacity: isHovering ? 0.9 : 0.5,
					}}
					transition={{ duration: 0.25, ease: "easeOut" }}
					style={{ transformOrigin: "center" }}
				/>
			</motion.div>
		</>
	);
}
