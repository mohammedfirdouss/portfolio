import Link from "next/link";
import { allTalks } from "contentlayer/generated";

export const metadata = {
	title: "Talks",
	description:
		"Conference talks, presentations, and podcasts — sharing knowledge on AWS, serverless, and cloud.",
};

export default function TalksPage() {
	const talks = allTalks
		.filter((t) => t.published !== false)
		.sort(
			(a, b) =>
				new Date(b.date).getTime() - new Date(a.date).getTime(),
		);

	return (
		<div>
			<h1 className="font-display text-8xl text-gray-200 mb-8">talks</h1>
			<div className="text-lg text-gray-700 mb-12">
				<p>
					I talk sometimes — at conferences, meetups, and podcasts. Here are
					some of my past presentations.
				</p>
			</div>
			<div className="space-y-6">
				{talks.map((talk) => (
					<Link
						key={talk.slug}
						href={`/talks/${talk.slug}`}
						className="block group"
					>
						<div className="flex items-baseline gap-4">
							<span className="text-lg font-semibold text-gray-900 group-hover:text-sky-600 transition-colors">
								{talk.title}
							</span>
							<span className="text-sm text-gray-400">
								{new Date(talk.date).toLocaleDateString("en-us", {
									year: "numeric",
									month: "short",
								})}
							</span>
						</div>
						<div className="text-sm text-gray-500 mt-1">
							{talk.event}
							{talk.topic && ` · ${talk.topic}`}
						</div>
						{talk.summary && (
							<p className="text-gray-500 mt-1">{talk.summary}</p>
						)}
						<span className="inline-block mt-2 text-sm text-sky-600 group-hover:underline">
							{talk.url ? "Watch / Read more →" : "Read more →"}
						</span>
					</Link>
				))}
			</div>
		</div>
	);
}
