import Link from "next/link";
import { Eye, ArrowUpRight, Calendar, GitFork } from "lucide-react";
import type { OpenSource } from "contentlayer/generated";

type Props = {
	entry: OpenSource;
	views: number;
	featured?: boolean;
};

export function OpenSourceArticle({ entry, views, featured = false }: Props) {
	return (
		<Link
			href={`/open-source/${entry.slug}`}
			className="group block h-full"
			aria-label={entry.title}
			data-cursor="pointer"
			data-cursor-text="View"
		>
			<article
				className={`p-6 md:p-8 h-full flex flex-col ${
					featured ? "md:p-10" : ""
				}`}
			>
				{/* Meta info */}
				<div className="flex justify-between gap-2 items-center mb-4">
					<div className="flex items-center gap-3">
						<span className="flex items-center gap-1.5 text-xs text-zinc-300">
							<Calendar className="w-3.5 h-3.5" />
							{entry.date ? (
								<time dateTime={new Date(entry.date).toISOString()}>
									{Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
										new Date(entry.date),
									)}
								</time>
							) : (
								<span>In Progress</span>
							)}
						</span>
					</div>
					<span className="flex items-center gap-1.5 text-xs text-zinc-300">
						<Eye className="w-3.5 h-3.5" />
						{Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
					</span>
				</div>

				{/* Title */}
				<h2
					className={`font-semibold text-zinc-100 group-hover:text-white font-display transition-colors duration-300 flex items-start justify-between gap-2 ${
						featured ? "text-2xl lg:text-3xl" : "text-xl lg:text-2xl"
					}`}
				>
					<span className="flex items-center gap-2">
						<GitFork className="w-5 h-5 text-zinc-300 group-hover:text-zinc-200 transition-colors duration-300" />
						{entry.title}
					</span>
					<ArrowUpRight
						className={`flex-shrink-0 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300 text-zinc-400 ${
							featured ? "w-6 h-6" : "w-5 h-5"
						}`}
					/>
				</h2>

				{/* Description */}
				<p
					className={`mt-3 text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300 flex-grow ${
						featured ? "text-base line-clamp-3" : "text-sm line-clamp-2"
					}`}
				>
					{entry.summary || "No summary available."}
				</p>

				{/* Read more */}
				<div className="mt-4 pt-4 border-t border-zinc-800/50">
					<span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-zinc-300 bg-zinc-800/50 rounded-full group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition-all duration-300">
						View contribution
						<ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
					</span>
				</div>
			</article>
		</Link>
	);
}
