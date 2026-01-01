import type { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Diagrams | Portfolio",
	description: "Visual diagrams and technical illustrations.",
};

export default function DiagramsLayout({ children }: { children: ReactNode }) {
	return (
		<div className="relative min-h-screen bg-gradient-to-tl from-zinc-900 via-zinc-400/10 to-zinc-900 ">
			{children}
		</div>
	);
}
