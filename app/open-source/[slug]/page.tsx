import { notFound } from "next/navigation";
import { Mdx } from "@/app/components/mdx";
import {
	PostHeader,
	PostFooter,
	formatMonth,
	neighbours,
	repositoryUrl,
} from "@/app/components/post-layout";
import { OutcomeProofBlock } from "@/app/components/outcome-proof-block";
import { allOpenSources } from "contentlayer/generated";

type Props = {
	params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
	return allOpenSources.map((item) => ({
		slug: item.slug,
	}));
}

export default async function OpenSourceDetailPage({ params }: Props) {
	const { slug } = await params;
	const item = allOpenSources.find((entry) => entry.slug === slug);

	if (!item) {
		notFound();
	}

	const { previous, next } = neighbours(
		allOpenSources.filter((c) => c.published !== false),
		slug,
		"/open-source",
	);

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
			<OutcomeProofBlock
				outcomes={item.outcomes}
				roleHighlights={item.roleHighlights}
				proofLinks={item.proofLinks}
				repository={item.repository}
			/>
			<article>
				<Mdx code={item.body.code} />
			</article>
			<PostFooter previous={previous} next={next} />
		</div>
	);
}
