import { notFound } from "next/navigation";
import { Mdx } from "@/app/components/mdx";
import {
	PostHeader,
	PostFooter,
	neighbours,
} from "@/app/components/post-layout";
import { OutcomeProofBlock } from "@/app/components/outcome-proof-block";
import { getYoutubeEmbedId } from "@/app/lib/youtube";
import { allTalks } from "contentlayer/generated";

type Props = {
	params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
	return allTalks.map((talk) => ({
		slug: talk.slug,
	}));
}

export default async function TalkDetailPage({ params }: Props) {
	const { slug } = await params;
	const talk = allTalks.find((entry) => entry.slug === slug);

	if (!talk) {
		notFound();
	}

	const embedId = talk.url ? getYoutubeEmbedId(talk.url) : null;

	const { previous, next } = neighbours(
		allTalks.filter((t) => t.published !== false),
		slug,
		"/talks",
	);

	return (
		<div>
			<PostHeader
				title={talk.title}
				meta={[
					new Date(talk.date).toLocaleDateString("en-us", {
						year: "numeric",
						month: "long",
						day: "numeric",
					}),
					talk.event,
					talk.url && !embedId && (
						<a href={talk.url} target="_blank" rel="noopener noreferrer" className="prose-link">
							watch
						</a>
					),
				]}
				summary={talk.summary}
			/>
			{embedId && (
				<div className="mb-7">
					<div className="relative w-full aspect-video overflow-hidden">
						<iframe
							src={`https://www.youtube-nocookie.com/embed/${embedId}`}
							title={talk.title}
							className="absolute inset-0 w-full h-full"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						/>
					</div>
					<p className="post-meta mt-2">
						<a href={talk.url} target="_blank" rel="noopener noreferrer" className="prose-link">
							watch on YouTube ↗
						</a>
					</p>
				</div>
			)}
			<OutcomeProofBlock
				outcomes={talk.outcomes}
				roleHighlights={talk.roleHighlights}
				proofLinks={talk.proofLinks}
			/>
			<article>
				<Mdx code={talk.body.code} />
			</article>
			<PostFooter previous={previous} next={next} />
		</div>
	);
}
