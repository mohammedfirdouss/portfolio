import Link from "next/link";
import { ExternalLink, ArrowUpRight, Calendar } from "lucide-react";

type Props = {
	project: any;
	featured?: boolean;
};

export const Article: React.FC<Props> = ({ project, featured = false }) => {
	const isExternal = !!project.url || !!project.externalUrl;
	const externalLink = project.url || project.externalUrl;

	const content = (
		<article
			className={`p-6 md:p-8 h-full flex flex-col ${featured ? "md:p-10" : ""}`}
		>
			{/* Meta info */}
			<div className="flex justify-between gap-2 items-center mb-4">
				<div className="flex items-center gap-3">
					<span className="flex items-center gap-1.5 text-xs text-zinc-500">
						<Calendar className="w-3.5 h-3.5" />
						{project.publishedAt ? (
							<time dateTime={new Date(project.publishedAt).toISOString()}>
								{Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
									new Date(project.publishedAt),
								)}
							</time>
						) : (
							<span>Coming Soon</span>
						)}
					</span>
				</div>
				{project.source && (
					<span className="inline-flex items-center gap-1 px-2 py-1 text-xs text-zinc-500 border border-zinc-800 rounded-full bg-zinc-900/50">
						{project.source}
						{isExternal && <ExternalLink className="w-3 h-3" />}
					</span>
				)}
			</div>

			{/* Title */}
			<h2
				className={`font-semibold text-zinc-100 group-hover:text-white font-display transition-colors duration-300 flex items-start justify-between gap-2 ${
					featured ? "text-2xl lg:text-3xl" : "text-xl lg:text-2xl"
				}`}
			>
				<span>{project.title}</span>
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
				{project.description}
			</p>

			{/* Read more */}
			<div className="mt-4 pt-4 border-t border-zinc-800/50">
				<span className="text-xs font-medium text-zinc-500 group-hover:text-white transition-colors duration-300 flex items-center gap-1">
					{isExternal ? `Read on ${project.source}` : "Read article"}
					<ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
				</span>
			</div>
		</article>
	);

	if (isExternal) {
		return (
			<a
				href={externalLink}
				target="_blank"
				rel="noopener noreferrer"
				className="group block h-full"
				data-cursor="pointer"
				data-cursor-text="Read"
			>
				{content}
			</a>
		);
	}

	return (
		<Link
			href={`/blog/${project.slug}`}
			className="group block h-full"
			aria-label={project.title}
			data-cursor="pointer"
			data-cursor-text="Read"
		>
			{content}
		</Link>
	);
};
