import { notFound } from "next/navigation";
import { Mdx } from "@/app/components/mdx";
import { OutcomeProofBlock } from "@/app/components/outcome-proof-block";
import { getYoutubeEmbedId } from "@/app/lib/youtube";
import "@/app/blog/[slug]/mdx.css";
import { allTalks } from "contentlayer/generated";
import Link from "next/link";

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

	return (
		<div>
			<div className="mb-8">
				<h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
					{talk.title}
				</h1>
				<div className="text-gray-400 dark:text-gray-500 mt-2 text-sm flex gap-2 items-center flex-wrap">
					<time>
						{new Date(talk.date).toLocaleDateString("en-us", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</time>
					<span>·</span>
					<span>{talk.event}</span>
					{talk.url && !embedId && (
						<>
							<span>·</span>
							<a
								href={talk.url}
								target="_blank"
								rel="noopener noreferrer"
								className="prose-link text-sm"
							>
								Watch
							</a>
						</>
					)}
				</div>
				{talk.summary && (
					<p className="text-gray-500 dark:text-gray-400 mt-4 text-lg">{talk.summary}</p>
				)}
			</div>
			{embedId && (
				<div className="mb-8">
					<div className="relative w-full aspect-video overflow-hidden rounded-lg border border-gray-100 dark:border-gray-800">
						<iframe
							src={`https://www.youtube-nocookie.com/embed/${embedId}`}
							title={talk.title}
							className="absolute inset-0 w-full h-full"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						/>
					</div>
					<a
						href={talk.url}
						target="_blank"
						rel="noopener noreferrer"
						className="prose-link text-sm mt-2 inline-block"
					>
						Watch on YouTube ↗
					</a>
				</div>
			)}
			<OutcomeProofBlock
				outcomes={talk.outcomes}
				roleHighlights={talk.roleHighlights}
				proofLinks={talk.proofLinks}
			/>
			<article className="prose max-w-none">
				<Mdx code={talk.body.code} />
			</article>
			<div className="mt-8 text-sm font-mono text-gray-500 dark:text-gray-400">
				<Link href="/talks" className="prose-link">
					cd ..
				</Link>
			</div>
		</div>
	);
}
