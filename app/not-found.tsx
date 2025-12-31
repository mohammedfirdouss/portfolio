import Link from "next/link";
import dynamic from "next/dynamic";

const Navigation = dynamic(() => import("./components/nav").then(mod => ({ default: mod.Navigation })), {
	ssr: false,
});

const NotFoundContent = dynamic(() => import("./components/not-found-content"), {
	ssr: false,
});

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
			<NotFoundContent />
			
			{/* Corner decorations */}
			<div className="absolute top-24 left-8 w-24 h-24 border-l border-t border-zinc-800/50 rounded-tl-3xl" />
			<div className="absolute top-24 right-8 w-24 h-24 border-r border-t border-zinc-800/50 rounded-tr-3xl" />
		</div>
	);
}
