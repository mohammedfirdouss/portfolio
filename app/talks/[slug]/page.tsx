import { notFound } from "next/navigation";
import { Mdx } from "@/app/components/mdx";
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

	return (
		<div>
			<div className="mb-8">
				<h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
					{talk.title}
				</h1>
				<div className="text-gray-400 mt-2 text-sm flex gap-2 items-center flex-wrap">
					<time>
						{new Date(talk.date).toLocaleDateString("en-us", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</time>
					<span>·</span>
					<span>{talk.event}</span>
					{talk.url && (
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
					<p className="text-gray-500 mt-4 text-lg">{talk.summary}</p>
				)}
			</div>
			<article className="prose max-w-none">
				<Mdx code={talk.body.code} />
			</article>
			<div className="mt-8 text-sm font-mono text-gray-500">
				<Link href="/talks" className="prose-link">
					cd ..
				</Link>
			</div>
		</div>
	);
}
