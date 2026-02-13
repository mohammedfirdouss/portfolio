import { notFound } from "next/navigation";
import { Mdx } from "@/app/components/mdx";
import { Navigation } from "@/app/components/nav";
import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import "./mdx.css";

export const revalidate = 60;

type Props = {
	params: {
		slug: string;
	};
};

export async function generateStaticParams(): Promise<Props["params"][]> {
	// No changelogs available - return empty array
	return [];
}

export default async function ChangelogEntryPage({ params }: Props) {
	const slug = params?.slug;

	// No changelogs available - always return not found
	notFound();
}
