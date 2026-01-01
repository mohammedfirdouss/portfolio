"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface HackerTextProps {
	text: string;
	className?: string;
	speed?: number;
}

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

export function HackerText({ text, className = "", speed = 30 }: HackerTextProps) {
	const [displayText, setDisplayText] = useState(text);
	const [isHovered, setIsHovered] = useState(false);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	const scramble = () => {
		let iteration = 0;

		clearInterval(intervalRef.current as NodeJS.Timeout);

		intervalRef.current = setInterval(() => {
			setDisplayText((prev) =>
				text
					.split("")
					.map((letter, index) => {
						if (index < iteration) {
							return text[index];
						}
						return letters[Math.floor(Math.random() * letters.length)];
					})
					.join(""),
			);

			if (iteration >= text.length) {
				clearInterval(intervalRef.current as NodeJS.Timeout);
			}

			iteration += 1 / 3;
		}, speed);
	};

	useEffect(() => {
		// Initial scramble on load
		scramble();
		return () => clearInterval(intervalRef.current as NodeJS.Timeout);
	}, [text]);

	return (
		<motion.span
			className={`inline-block font-mono cursor-default ${className}`}
			onMouseEnter={() => {
				setIsHovered(true);
				scramble();
			}}
			onMouseLeave={() => setIsHovered(false)}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			{displayText}
		</motion.span>
	);
}
