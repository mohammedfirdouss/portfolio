import { notFound } from "next/navigation";
import { Mdx } from "@/app/components/mdx";
import "../mdx.css";
import { Navigation } from "@/app/components/nav";
import ScrollProgress from "@/app/components/scroll-progress";

interface Props {
	params: { slug: string };
}

export default function DiagramsEntryPage({ params }: Props) {
	// No diagrams available - always return not found
	notFound();
}
