import React from "react";
import Link from "next/link";
import { allExperiences } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Mdx } from "../components/mdx";
import {
	Calendar,
	MapPin,
	Sparkles,
	Building2,
	ArrowUpRight,
} from "lucide-react";

export const metadata = {
	title: "Experience",
	description: "My professional journey and career milestones.",
};

export default function ExperiencePage() {
	const experiences = allExperiences.sort(
		(a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
	);

	return (
		<div className="relative min-h-screen bg-black">
			{/* Background effects */}
			<div className="absolute inset-0 bg-gradient-to-br from-zinc-900/30 via-black to-zinc-900/20" />
			<div
				className="absolute inset-0 opacity-[0.02]"
				style={{
					backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
					backgroundSize: "80px 80px",
				}}
			/>

			{/* Radial glow */}
			<div className="absolute top-0 right-1/4 w-[800px] h-[600px] bg-gradient-radial from-zinc-800/20 via-transparent to-transparent rounded-full blur-3xl" />

			<Navigation />

			<div className="relative z-10 px-6 pt-24 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-32 lg:pt-40">
				{/* Header */}
				<div className="max-w-2xl mx-auto lg:mx-0">
					<div className="h-px w-16 bg-gradient-to-r from-zinc-500 to-transparent mb-8" />
					<div className="flex items-center gap-3 mb-4">
						<Sparkles className="w-5 h-5 text-zinc-500" />
						<span className="text-sm font-medium tracking-widest uppercase text-zinc-500">
							Career Path
						</span>
					</div>
					<h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl font-display">
						Experience
					</h1>
					<p className="mt-6 text-lg text-zinc-400 leading-relaxed">
						A timeline of my professional roles and the value I've delivered to
						various organizations.
					</p>
				</div>

				{/* Divider */}
				<div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

				{/* Experience List */}
				<div className="relative max-w-4xl mx-auto lg:mx-0">
					{/* Vertical Line for Timeline Effect on Desktop */}
					<div className="hidden md:block absolute left-0 top-4 bottom-0 w-px bg-zinc-800" />

					<div className="space-y-12">
						{experiences.map((experience, index) => (
							<div
								key={experience._id}
								className="relative pl-0 md:pl-12 group"
							>
								{/* Timeline Dot */}
								<div className="hidden md:flex absolute left-[-4px] top-0 items-center justify-center w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-700 ring-4 ring-black group-hover:bg-emerald-500 group-hover:border-emerald-400 transition-colors duration-300 mt-[0.875rem]" />

								<Card>
									<article className="p-6 md:p-8 relative overflow-hidden">
										<div className="flex flex-col md:flex-row gap-6 md:items-start justify-between mb-8">
											<div className="space-y-2">
												<h2 className="text-2xl font-bold text-zinc-100 font-display group-hover:text-white transition-colors">
													{experience.role}
												</h2>
												<div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-400">
													<div className="flex items-center gap-1.5">
														<Building2 className="w-4 h-4" />
														{experience.companyUrl ? (
															<Link
																href={experience.companyUrl}
																target="_blank"
																className="hover:text-emerald-400 transition-colors flex items-center gap-1"
															>
																{experience.company}
																<ArrowUpRight className="w-3 h-3" />
															</Link>
														) : (
															<span>{experience.company}</span>
														)}
													</div>
													<div className="flex items-center gap-1.5">
														<MapPin className="w-4 h-4" />
														<span>{experience.location}</span>
													</div>
												</div>
											</div>

											<div className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/50 border border-zinc-800 text-xs font-medium text-zinc-400 backdrop-blur-sm">
												<Calendar className="w-3.5 h-3.5" />
												<time
													dateTime={new Date(
														experience.startDate,
													).toISOString()}
												>
													{new Date(experience.startDate).toLocaleDateString(
														"en-US",
														{ month: "short", year: "numeric" },
													)}
												</time>
												<span>—</span>
												{experience.endDate ? (
													<time
														dateTime={new Date(
															experience.endDate,
														).toISOString()}
													>
														{new Date(experience.endDate).toLocaleDateString(
															"en-US",
															{ month: "short", year: "numeric" },
														)}
													</time>
												) : (
													<span className="text-emerald-400">Present</span>
												)}
											</div>
										</div>

										<div className="prose prose-zinc prose-invert max-w-none text-zinc-400">
											<Mdx code={experience.body.code} />
										</div>
									</article>
								</Card>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Bottom padding */}
			<div className="h-24" />
		</div>
	);
}
