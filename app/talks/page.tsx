import Link from "next/link";
import { allTalks } from "contentlayer/generated";

export const metadata = {
	title: "Talks",
	description:
		"Conference talks and presentations, sharing knowledge on AWS, serverless, and cloud.",
};

export default function TalksPage() {
	const talks = allTalks
		.filter((t) => t.published !== false)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return (
		<div>
			<h1 className="font-display text-5xl sm:text-6xl md:text-7xl xl:text-8xl text-gray-200 mb-8">talks</h1>
			<div className="text-lg text-gray-700 mb-12">
				<p>I talk sometimes. Here are some of my past presentations.</p>
			</div>
			<div className="divide-y divide-gray-100">
				{talks.map((talk) => (
					<div key={talk.slug} className="pt-6 first:pt-0">
						<div className="text-2xl leading-normal text-gray-900">
							<Link href={`/talks/${talk.slug}`} className="prose-link">
								{talk.title}
							</Link>
						</div>
						<div className="flex items-center gap-1 flex-wrap text-gray-400 text-sm mt-1">
							<time>
								{new Date(talk.date).toLocaleDateString("en-us", {
									year: "numeric",
									month: "short",
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
										watch ↗
									</a>
								</>
							)}
						</div>
						{talk.summary && (
							<p className="text-lg text-gray-500 mt-2">{talk.summary}</p>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
