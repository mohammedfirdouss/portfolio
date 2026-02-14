import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Contact",
	description:
		"Get in touch — always open to discussing new projects, opportunities, and collaborations.",
};

export default function ContactLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
