"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
	const [isHydrated, setIsHydrated] = useState(false);
	const [isHovering, setIsHovering] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const cursorX = useMotionValue(-100);
	const cursorY = useMotionValue(-100);

	// Smoother, "floaty" spring physics for the follower effect
	const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
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

			// Check if the element is interactive
			if (
				target.tagName === "A" ||
				target.tagName === "BUTTON" ||
				target.closest("a") ||
				target.closest("button") ||
				target.dataset.cursor === "pointer" ||
				// Also check for common interactive classes/roles if needed
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

	if (!isHydrated) return null;

	return (
		<motion.div
			className="fixed top-0 left-0 pointer-events-none z-[999] mix-blend-difference"
			style={{
				x: cursorXSpring,
				y: cursorYSpring,
				opacity: isVisible ? 1 : 0,
			}}
		>
			<motion.div
				className="absolute -top-6 -left-6 w-12 h-12 rounded-full border border-white bg-white/5 backdrop-blur-[1px]"
				animate={{
					scale: isHovering ? 1.5 : 1,
					backgroundColor: isHovering
						? "rgba(255, 255, 255, 0.1)"
						: "rgba(255, 255, 255, 0.05)",
					borderColor: isHovering
						? "rgba(255, 255, 255, 0.8)"
						: "rgba(255, 255, 255, 0.4)",
				}}
				transition={{ duration: 0.3, ease: "easeOut" }}
			/>
		</motion.div>
	);
}
