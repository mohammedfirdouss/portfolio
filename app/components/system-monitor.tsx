"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Wifi, Server, MapPin, Minus, Plus } from "lucide-react";

export function SystemMonitor() {
	const [latency, setLatency] = useState(24);
	const [uptime, setUptime] = useState(99.99);
	const [memory, setMemory] = useState(42);
	const [minimized, setMinimized] = useState(false);
	const constraintsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const interval = setInterval(() => {
			setLatency((prev) => {
				const change = Math.floor(Math.random() * 10) - 5;
				const newValue = prev + change;
				return newValue > 10 && newValue < 100 ? newValue : 30;
			});

			setMemory((prev) => {
				const change = Math.floor(Math.random() * 4) - 2;
				const newValue = prev + change;
				return newValue > 20 && newValue < 80 ? newValue : 40;
			});
		}, 2000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div
			ref={constraintsRef}
			className="fixed inset-0 z-40 hidden md:block pointer-events-none"
			aria-hidden
		>
			<motion.div
				initial={{ opacity: 0, x: 50 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 1, delay: 2 }}
				drag
				dragConstraints={constraintsRef}
				dragElastic={0}
				dragMomentum={false}
				className="absolute top-24 right-6 flex flex-col gap-2 font-mono text-[10px] tracking-wider select-none cursor-grab active:cursor-grabbing pointer-events-auto touch-none"
			>
				<div className="flex flex-col gap-1 p-3 bg-zinc-950/80 backdrop-blur-md border border-zinc-800/50 rounded-lg shadow-2xl w-56">
					{/* Header */}
					<div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-1">
						<span className="text-zinc-500 uppercase">System Status</span>
						<div className="flex items-center gap-2">
							<span className="relative flex h-2 w-2">
								<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
								<span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
							</span>
							<span className="text-emerald-500 font-bold">ONLINE</span>
							<button
								onClick={(e) => {
									e.stopPropagation();
									setMinimized(!minimized);
								}}
								onPointerDown={(e) => e.stopPropagation()}
								className="ml-1 p-0.5 rounded hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
								aria-label={minimized ? "Expand" : "Minimize"}
							>
								{minimized ? <Plus size={10} /> : <Minus size={10} />}
							</button>
						</div>
					</div>

					<AnimatePresence initial={false}>
						{!minimized && (
							<motion.div
								initial={{ height: 0, opacity: 0 }}
								animate={{ height: "auto", opacity: 1 }}
								exit={{ height: 0, opacity: 0 }}
								transition={{ duration: 0.2, ease: "easeInOut" }}
								className="overflow-hidden"
							>
								{/* Region */}
								<div className="flex items-center justify-between text-zinc-400">
									<div className="flex items-center gap-2">
										<MapPin size={10} />
										<span>REGION</span>
									</div>
									<span className="text-zinc-200">af-south-1</span>
								</div>

								{/* Latency */}
								<div className="flex items-center justify-between text-zinc-400">
									<div className="flex items-center gap-2">
										<Wifi size={10} />
										<span>LATENCY</span>
									</div>
									<span className="text-zinc-200 whitespace-nowrap">
										{latency}ms avg
									</span>
								</div>

								{/* Availability */}
								<div className="flex items-center justify-between text-zinc-400">
									<div className="flex items-center gap-2">
										<Activity size={10} />
										<span>UPTIME</span>
									</div>
									<span className="text-emerald-400">
										{uptime.toFixed(2)}%
									</span>
								</div>

								{/* Load Bar */}
								<div className="mt-2">
									<div className="flex items-center justify-between mb-1 text-zinc-500">
										<div className="flex items-center gap-2">
											<Server size={10} />
											<span>LOAD</span>
										</div>
										<span>{memory}%</span>
									</div>
									<div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
										<motion.div
											className="h-full bg-gradient-to-r from-emerald-500 to-blue-500"
											animate={{ width: `${memory}%` }}
											transition={{ duration: 0.5 }}
										/>
									</div>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>

				{/* Decorational ID */}
				<AnimatePresence>
					{!minimized && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="px-1 text-zinc-700 text-[9px]"
						>
							ID: {Math.random().toString(36).substring(7).toUpperCase()}{" "}
							// CLOUD_ARCH
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>
		</div>
	);
}
