import { notFound } from "next/navigation";
import { Mdx } from "@/app/components/mdx";
import {
	PostHeader,
	PostFooter,
	formatMonth,
	neighbours,
	repositoryUrl,
} from "@/app/components/post-layout";
import { allDiagrams } from "contentlayer/generated";

type Props = {
	params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
	return allDiagrams.map((item) => ({
		slug: item.slug,
	}));
}

export default async function DiagramDetailPage({ params }: Props) {
	const { slug } = await params;
	const item = allDiagrams.find((entry) => entry.slug === slug);

	if (!item) {
		notFound();
	}

	const { previous, next } = neighbours(allDiagrams, slug, "/diagrams");

	return (
		<div>
			<PostHeader
				title={item.title}
				meta={[
					item.date && formatMonth(item.date),
					item.repository && (
						<a href={repositoryUrl(item.repository)} target="_blank" rel="noopener noreferrer" className="prose-link">
							source
						</a>
					),
				]}
				summary={item.summary}
			/>
			<article>
				<Mdx code={item.body.code} />
			</article>
			<PostFooter previous={previous} next={next} />
		</div>
	);
}
