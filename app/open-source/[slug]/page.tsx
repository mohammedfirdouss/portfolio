import { notFound } from "next/navigation";
import { Mdx } from "@/app/components/mdx";
import "./mdx.css";
import { Navigation } from "@/app/components/nav"; // Added import

interface Props {
	params: { slug: string };
}

export default function OpenSourceEntryPage({ params }: Props) {
	// No open-source documents available - always return not found
	notFound();
}
