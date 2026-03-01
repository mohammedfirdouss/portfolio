import { notFound } from "next/navigation";
import { Mdx } from "@/app/components/mdx";
import { allDiagrams } from "contentlayer/generated";
import Link from "next/link";

type Props = {
	params: Promise<{ slug: string }>;
};

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

	return (
		<div>
			<div className="mb-8">
				<h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
					{item.title}
				</h1>
				<div className="text-gray-400 mt-2 text-sm flex gap-2 items-center flex-wrap">
					{item.date && (
						<time>
							{new Date(item.date).toLocaleDateString("en-us", {
								year: "numeric",
								month: "long",
							})}
						</time>
					)}
					{item.repository && (
						<>
							<span>·</span>
							<a
								href={item.repository}
								target="_blank"
								rel="noopener noreferrer"
								className="prose-link text-sm"
							>
								source
							</a>
						</>
					)}
				</div>
				{item.summary && (
					<p className="text-gray-500 mt-4 text-lg">{item.summary}</p>
				)}
			</div>
			<article className="prose max-w-none">
				<Mdx code={item.body.code} />
			</article>
			<div className="mt-8 text-sm font-mono text-gray-500">
				<Link href="/diagrams" className="prose-link">
					cd ..
				</Link>
			</div>
		</div>
	);
}
