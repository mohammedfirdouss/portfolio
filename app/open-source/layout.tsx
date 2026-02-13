import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Open Source | Mohammed Firdous",
	description: "A collection of my open-source contributions.",
};

export default function OpenSourceLayout({
	children,
}: { children: ReactNode }) {
	return <>{children}</>;
}
