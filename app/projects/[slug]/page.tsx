import { notFound } from "next/navigation";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";
import { getRedis } from "@/util/redis";
import ReportView from "@/app/components/report-view-wrapper";

export const revalidate = 60;

type Props = {
	params: {
		slug: string;
	};
};

export async function generateStaticParams(): Promise<Props["params"][]> {
	// No projects available - return empty array
	return [];
	}

export default async function PostPage({ params }: Props) {
	const slug = params?.slug;
	
	// No projects available - always return not found
	notFound();
}
