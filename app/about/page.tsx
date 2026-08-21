import Link from "next/link";

export const metadata = {
	title: "About",
	description:
		"Cloud Engineer building infrastructure, AI systems, and open source tools.",
};

const startHere = [
	{
		title: "PipeCD: Codegen Image Security Hardening",
		href: "/open-source/pipecd-security-hardening",
		note: "Cut a CNCF Sandbox project's Docker image from 800MB to 500MB while closing out its CVEs.",
	},
	{
		title: "PipeCD: Analysis Stage Template Rendering Fix",
		href: "/open-source/pipecd-template-fix",
		note: "Root-caused a bug where template variables leaked raw into logs instead of being rendered.",
	},
	{
		title: "GitLab AI Gateway Contribution",
		href: "/open-source/gitlab-ai-assist",
		note: "Refactored middleware in GitLab's AI Gateway without breaking existing behavior.",
	},
];

export default function AboutPage() {
	return (
		<div>
			<h1 className="font-display text-5xl sm:text-6xl md:text-7xl xl:text-8xl text-gray-200 mb-8">
				about
			</h1>

			<div className="text-lg text-gray-700 space-y-4">
				<p>
					I&apos;m a Cloud Engineer working on infrastructure, AI systems, and
					open source. Most recently I was a CNCF LFX Mentee building the
					Kubernetes multi-cluster plugin for PipeCD, and I hold the CNCF
					Kubernetes and Cloud Native Associate (KCNA) certification.
				</p>
				<p>
					I like fixing things at the layer most people don&apos;t look at —
					build pipelines, container images, deployment plugins — and writing
					about what I find there. Full work history is on the{" "}
					<Link href="/experience" className="prose-link">
						experience
					</Link>{" "}
					page.
				</p>
			</div>

			<div className="border-t border-gray-100 pt-12 mt-12">
				<h2 className="xl:text-6xl md:text-5xl text-3xl font-display text-gray-200 relative -ml-2 -mb-4 xl:-ml-18 xl:-mb-6 -z-10">
					start here
				</h2>
				<ul className="mt-8">
					{startHere.map((item) => (
						<li key={item.href} className="mb-6">
							<Link href={item.href} className="prose-link text-xl">
								{item.title}
							</Link>
							<p className="text-gray-500 mt-1">{item.note}</p>
						</li>
					))}
				</ul>
			</div>

			<div className="border-t border-gray-100 pt-8 mt-8 text-gray-700">
				<p>
					If you want to get in touch, I&apos;m easiest to reach on{" "}
					<a
						href="https://www.linkedin.com/in/mohammedfirdousaraoye/"
						target="_blank"
						rel="noopener noreferrer"
						className="prose-link"
					>
						LinkedIn
					</a>{" "}
					or{" "}
					<a
						href="https://twitter.com/iamfirdouss"
						target="_blank"
						rel="noopener noreferrer"
						className="prose-link"
					>
						Twitter
					</a>
					. Code lives on{" "}
					<a
						href="https://github.com/mohammedfirdouss"
						target="_blank"
						rel="noopener noreferrer"
						className="prose-link"
					>
						GitHub
					</a>
					.
				</p>
			</div>
		</div>
	);
}
