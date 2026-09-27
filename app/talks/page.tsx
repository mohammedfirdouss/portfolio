import Link from "next/link";
import { allTalks } from "contentlayer/generated";

export const metadata = {
	title: "Talks",
	description:
		"Talks and presentations on AWS, serverless, and cloud.",
};

export default function TalksPage() {
	const talks = allTalks
		.filter((t) => t.published !== false)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return (
		<div>
			<h1 className="page-title">talks</h1>
			<div className="text-lg text-[color:var(--fg)] mb-12">
				<p>
					I give talks on AWS, serverless and cloud infrastructure. Here are
					some of my past presentations. If you&apos;d like me to speak at your
					event, reach out on{" "}
					<a
						href="https://www.linkedin.com/in/mohammedfirdousaraoye/"
						target="_blank"
						rel="noopener noreferrer"
						className="prose-link"
					>
						LinkedIn
					</a>
					.
				</p>
			</div>
			<div className="divide-y divide-[color:var(--rule)]">
				{talks.map((talk) => (
					<div key={talk.slug} className="pt-6 first:pt-0">
						<div className="text-2xl leading-normal text-[color:var(--fg)]">
							<Link href={`/talks/${talk.slug}`} className="prose-link">
								{talk.title}
							</Link>
						</div>
						<div className="flex items-center gap-1 flex-wrap text-[color:var(--muted)] text-sm mt-1">
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
					</div>
				))}
			</div>
		</div>
	);
}
