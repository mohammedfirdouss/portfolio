import Link from "next/link";
import Image from "next/image";
import { Eye, ArrowUpRight } from "lucide-react";

type Props = {
	project: any;
	views: number;
};

export const Article: React.FC<Props> = ({ project, views }) => {
	const image = project.banner || project.screenshot;

	return (
		<Link
			href={`/projects/${project.slug}`}
			className="group block h-full flex flex-col"
			aria-label={project.title}
			data-cursor="pointer"
			data-cursor-text="View"
		>
			<article className="relative h-full flex flex-col overflow-hidden rounded-2xl">
				{/* Image Section */}
				{image && (
					<div className="relative w-full aspect-video overflow-hidden">
						<Image
							src={image}
							alt={project.title}
							fill
							className="object-cover transition-transform duration-500 group-hover:scale-105"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent opacity-60" />
					</div>
				)}

				{/* Content Section */}
				<div className="p-6 md:p-8 flex flex-col flex-grow relative z-10 -mt-12 bg-gradient-to-t from-transparent to-transparent">
					{/* Meta info */}
					<div className="flex justify-between gap-2 items-center mb-3">
						<span className="text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300 backdrop-blur-md bg-zinc-900/50 px-2 py-1 rounded-md border border-zinc-800/50">
							{project.date ? (
								<time dateTime={new Date(project.date).toISOString()}>
									{Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
										new Date(project.date),
									)}
								</time>
							) : (
								<span>Pending</span>
							)}
						</span>
						<span className="flex items-center gap-1.5 text-xs text-zinc-400 backdrop-blur-md bg-zinc-900/50 px-2 py-1 rounded-md border border-zinc-800/50">
							<Eye className="w-3.5 h-3.5" />{" "}
							{Intl.NumberFormat("en-US", { notation: "compact" }).format(
								views,
							)}
						</span>
					</div>

					{/* Title */}
					<h2 className="text-xl font-semibold lg:text-2xl text-zinc-100 group-hover:text-white font-display transition-colors duration-300 flex items-start justify-between gap-2 mt-auto">
						<span>{project.title}</span>
						<ArrowUpRight className="w-5 h-5 flex-shrink-0 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300 text-zinc-400" />
					</h2>

					{/* Description */}
					<p className="mt-3 text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300 line-clamp-2">
						{project.description}
					</p>

					{/* View Project Link */}
					<div className="mt-4 pt-4 border-t border-zinc-800/50">
						<span className="text-xs font-medium text-zinc-500 group-hover:text-white transition-colors duration-300 flex items-center gap-1">
							View project
							<ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
						</span>
					</div>
				</div>
			</article>
		</Link>
	);
};
