import Link from "next/link";
import { Navigation } from "./components/nav";
import { motion } from "framer-motion";

export default function NotFound() {
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
			
			{/* Corner decorations */}
			<div className="absolute top-24 left-8 w-24 h-24 border-l border-t border-zinc-800/50 rounded-tl-3xl" />
			<div className="absolute top-24 right-8 w-24 h-24 border-r border-t border-zinc-800/50 rounded-tr-3xl" />
		</div>
	);
}
