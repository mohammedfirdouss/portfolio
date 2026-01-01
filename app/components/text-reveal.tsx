"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TextRevealProps {
	children: string;
	className?: string;
	delay?: number;
}

export default function TextReveal({
	children,
	className = "",
	delay = 0,
}: TextRevealProps) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

	const words = children.split(" ");

	const container = {
		hidden: { opacity: 0 },
		visible: (i = 1) => ({
			opacity: 1,
			transition: { staggerChildren: 0.12, delayChildren: delay * i },
		}),
	};

	const child = {
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				type: "spring",
				damping: 12,
				stiffness: 100,
			},
		},
		hidden: {
			opacity: 0,
			y: 20,
			transition: {
				type: "spring",
				damping: 12,
				stiffness: 100,
			},
		},
	};

	return (
		<motion.div
			ref={ref}
			className={`overflow-hidden ${className}`}
			variants={container}
			initial="hidden"
			animate={isInView ? "visible" : "hidden"}
		>
			{words.map((word, index) => (
				<motion.span
					variants={child}
					key={index}
					className="inline-block mr-[0.25em]"
				>
					{word}
				</motion.span>
			))}
		</motion.div>
	);
}
