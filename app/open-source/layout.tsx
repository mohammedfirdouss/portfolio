import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Open Source | Portfolio",
	description: "A collection of my open-source contributions.",
};

export default function OpenSourceLayout({
	children,
}: { children: ReactNode }) {
	return (
		<div className="relative min-h-screen bg-gradient-to-tl from-zinc-900 via-zinc-400/10 to-zinc-900 ">
			{children}
		</div>
	);
}
