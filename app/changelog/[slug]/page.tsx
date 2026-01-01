import { notFound } from "next/navigation";
import { allChangelogs } from "contentlayer/generated";
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
	return allChangelogs.map((p) => ({
		slug: p.slug,
	}));
}

export default async function ChangelogEntryPage({ params }: Props) {
	const slug = params?.slug;
	const changelog = allChangelogs.find((p) => p.slug === slug);

	if (!changelog) {
		notFound();
	}

	return (
		<div className="relative min-h-screen bg-black">
			<Navigation />

			<div className="relative z-10 px-6 pt-24 mx-auto max-w-3xl lg:px-8 md:pt-32 lg:pt-40">
				<Link
					href="/changelog"
					className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-white transition-colors mb-8 group"
				>
					<ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
					Back to Changelog
				</Link>

				<div className="flex items-center gap-3 mb-6">
					<span className="flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase text-zinc-500">
						<Calendar className="w-3.5 h-3.5" />
						{Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
							new Date(changelog.date),
						)}
					</span>
				</div>

				<h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl font-display mb-8">
					{changelog.title}
				</h1>

				<div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent mb-12" />

				<article className="prose prose-zinc prose-invert max-w-none">
					<Mdx code={changelog.body.code} />
				</article>

				<div className="h-24" />
			</div>
		</div>
	);
}
