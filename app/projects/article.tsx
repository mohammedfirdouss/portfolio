import type { Project } from "@/.contentlayer/generated";
import Link from "next/link";
import { Eye, ArrowUpRight } from "lucide-react";

type Props = {
	project: Project;
	views: number;
};

export const Article: React.FC<Props> = ({ project, views }) => {
	return (
		<Link 
			href={`/projects/${project.slug}`} 
			className="group block h-full" 
			aria-label={project.title}
			data-cursor="pointer"
			data-cursor-text="View"
		>
			<article className="relative p-6 md:p-8 h-full flex flex-col">
				{/* Top meta info */}
				<div className="flex justify-between gap-2 items-center mb-4">
					<span className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300">
						{project.date ? (
							<time dateTime={new Date(project.date).toISOString()}>
								{Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
									new Date(project.date),
								)}
							</time>
						) : (
							<span></span>
						)}
					</span>
					<span className="flex items-center gap-1.5 text-xs text-zinc-500">
						<Eye className="w-3.5 h-3.5" />{" "}
						{Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
					</span>
				</div>
				
				{/* Title */}
				<h2 className="text-xl font-semibold lg:text-2xl text-zinc-100 group-hover:text-white font-display transition-colors duration-300 flex items-start justify-between gap-2">
					<span>{project.title}</span>
					<ArrowUpRight className="w-5 h-5 flex-shrink-0 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300 text-zinc-400" />
				</h2>
				
				{/* Description */}
				<p className="mt-3 text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300 line-clamp-2 flex-grow">
					{project.description}
				</p>
				
				{/* Read more link */}
				<div className="mt-4 pt-4 border-t border-zinc-800/50">
					<span className="text-xs font-medium text-zinc-500 group-hover:text-white transition-colors duration-300 flex items-center gap-1">
						View project
						<ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
					</span>
				</div>
			</article>
		</Link>
	);
};
