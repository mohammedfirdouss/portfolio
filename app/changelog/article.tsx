import type { Changelog } from "@/.contentlayer/generated";
import Link from "next/link";
import { ArrowUpRight, Calendar } from "lucide-react";

type Props = {
	changelog: Changelog;
};

export const Article: React.FC<Props> = ({ changelog }) => {
	return (
		<Link
			href={`/changelog/${changelog.slug}`}
			className="group block h-full"
			aria-label={changelog.title}
			data-cursor="pointer"
			data-cursor-text="View"
		>
			<article className="p-6 md:p-8 h-full flex flex-col">
				{/* Meta info */}
				<div className="flex justify-between gap-2 items-center mb-4">
					<div className="flex items-center gap-3">
						<span className="flex items-center gap-1.5 text-xs text-zinc-500">
							<Calendar className="w-3.5 h-3.5" />
							<time dateTime={new Date(changelog.date).toISOString()}>
								{Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
									new Date(changelog.date),
								)}
							</time>
						</span>
					</div>
				</div>

				{/* Title */}
				<h2 className="text-xl lg:text-2xl font-semibold text-zinc-100 group-hover:text-white font-display transition-colors duration-300 flex items-start justify-between gap-2">
					<span>{changelog.title}</span>
					<ArrowUpRight className="w-5 h-5 flex-shrink-0 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300 text-zinc-400" />
				</h2>

				{/* Summary */}
				<p className="mt-3 text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300 flex-grow line-clamp-2">
					{changelog.summary}
				</p>

				{/* Read more */}
				<div className="mt-4 pt-4 border-t border-zinc-800/50">
					<span className="text-xs font-medium text-zinc-500 group-hover:text-white transition-colors duration-300 flex items-center gap-1">
						View Details
						<ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
					</span>
				</div>
			</article>
		</Link>
	);
};
