"use client";
import {
	motion,
	useMotionTemplate,
	useMotionValue,
	useSpring,
} from "framer-motion";

import { PropsWithChildren, useState } from "react";

export const Card: React.FC<PropsWithChildren> = ({ children }) => {
	const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
	const mouseY = useSpring(0, { stiffness: 500, damping: 100 });
	const [isHovered, setIsHovered] = useState(false);

	const rotateX = useSpring(0, { stiffness: 500, damping: 100 });
	const rotateY = useSpring(0, { stiffness: 500, damping: 100 });

	function onMouseMove({ currentTarget, clientX, clientY }: any) {
		const { left, top, width, height } = currentTarget.getBoundingClientRect();
		const x = clientX - left;
		const y = clientY - top;
		
		mouseX.set(x);
		mouseY.set(y);

		// Calculate rotation based on mouse position
		const xPct = x / width - 0.5;
		const yPct = y / height - 0.5;
		rotateX.set(yPct * -10);
		rotateY.set(xPct * 10);
	}

	function onMouseLeave() {
		setIsHovered(false);
		rotateX.set(0);
		rotateY.set(0);
	}

	const maskImage = useMotionTemplate`radial-gradient(300px at ${mouseX}px ${mouseY}px, white, transparent)`;
	const style = { maskImage, WebkitMaskImage: maskImage };

	return (
		<motion.div
			onMouseMove={onMouseMove}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={onMouseLeave}
			style={{
				transformStyle: "preserve-3d",
				rotateX,
				rotateY,
			}}
			className="overflow-hidden relative duration-500 border rounded-2xl group md:gap-8 border-zinc-800 bg-gradient-to-br from-zinc-900/50 to-zinc-950/50 hover:border-zinc-700/80 transition-colors"
			data-cursor="pointer"
		>
			{/* Background glow effect */}
			<div className="pointer-events-none absolute inset-0 z-0">
				<div className="absolute inset-0 transition duration-1000 [mask-image:linear-gradient(black,transparent)]" />
				
				{/* Spotlight gradient */}
				<motion.div
					className="absolute inset-0 z-10 bg-gradient-to-br opacity-0 via-zinc-100/10 transition duration-500 group-hover:opacity-100"
					style={style}
				/>
				
				{/* Edge highlight */}
				<motion.div
					className="absolute inset-0 z-10 opacity-0 mix-blend-overlay transition duration-500 group-hover:opacity-100"
					style={style}
				/>
			</div>

			{/* Shimmer effect on hover */}
			<div 
				className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-500 ${
					isHovered ? 'opacity-100' : 'opacity-0'
				}`}
			>
				<div 
					className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
				/>
			</div>

			{/* Corner accents */}
			<div className="absolute top-0 left-0 w-8 h-8 border-l border-t border-zinc-700/0 group-hover:border-zinc-600/50 transition-colors duration-500 rounded-tl-2xl" />
			<div className="absolute top-0 right-0 w-8 h-8 border-r border-t border-zinc-700/0 group-hover:border-zinc-600/50 transition-colors duration-500 rounded-tr-2xl" />
			<div className="absolute bottom-0 left-0 w-8 h-8 border-l border-b border-zinc-700/0 group-hover:border-zinc-600/50 transition-colors duration-500 rounded-bl-2xl" />
			<div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-zinc-700/0 group-hover:border-zinc-600/50 transition-colors duration-500 rounded-br-2xl" />

			<div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
				{children}
			</div>
		</motion.div>
	);
};
