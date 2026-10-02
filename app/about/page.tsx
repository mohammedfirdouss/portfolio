import Link from "next/link";

export const metadata = {
	title: "About",
	description:
		"Software engineer focused on cloud infrastructure and AI, building open source software.",
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

const hackathonWins = [
	{
		title: "Solana Students Africa Hackathon — 1st place",
		note: "My team won the Campus Tools with Solana Pay track of this month-long hackathon with Konnect, a campus payments product.",
	},
	{
		title: "Festival of Change Hackathon 2025 — 1st place",
		note: "Won first place at this edtech hackathon.",
	},
	{
		title: "ECX 5.0 Hackathon — 2nd place",
		note: "Placed 2nd out of more than 40 teams at the 5th edition of the Engineering Career Expo.",
	},
];

export default function AboutPage() {
	return (
		<div>
			<h1 className="page-title">
				about
			</h1>

			<div className="text-lg text-[color:var(--fg)] space-y-4 text-justify text-pretty">
				<p>
					I&apos;m a software engineer working on cloud infrastructure and
					AI. I like working on new problems, especially building software,
					pipelines, deployments and the systems around them. Lately my
					focus has been on AI and everything that comes with it,
					specifically agents: how they&apos;re built, deployed and run in
					production, and the infrastructure that keeps them reliable and
					observable. I&apos;m also learning more about how to build reliable
					systems. I write when I have the time, and my full work
					history is on the{" "}
					<Link href="/experience" className="prose-link">
						experience
					</Link>{" "}
					page.
				</p>
				<p>
					I mostly write Python, Go and TypeScript, and work day to day with
					Kubernetes, AWS, GCP and Terraform.
				</p>
				<p>
					Earlier this year I was a CNCF LFX Mentee, where I{" "}
					<Link
						href="/blog/pipecd-kubernetes-multi-cluster-plugin-lfx"
						className="prose-link"
					>
						built the Kubernetes multi-cluster plugin for PipeCD
					</Link>
					. I&apos;m now an{" "}
					<a
						href="https://mentorship.lfx.linuxfoundation.org/project/a92ac5b3-b28c-4927-8e88-df0a6a8fa817"
						target="_blank"
						rel="noopener noreferrer"
						className="prose-link"
					>
						LFX Mentor for Term 3
					</a>
					, guiding work on a PipeCD plugin for Headlamp, the Kubernetes UI.
					I also contribute to GitLab&apos;s AI Gateway and CLI, and I&apos;ve
					given{" "}
					<Link href="/talks" className="prose-link">
						talks
					</Link>{" "}
					on AWS services, serverless and more.
				</p>
			</div>

			<div className="border-t border-[color:var(--rule)] pt-12 mt-12">
				<h2 className="section-title">
					hackathon wins
				</h2>
				<ul className="mt-8">
					{hackathonWins.map((item) => (
						<li key={item.title} className="mb-6">
							<span className="text-xl text-[color:var(--fg)]">
								{item.title}
							</span>
							<p className="text-[color:var(--muted)] mt-1">{item.note}</p>
						</li>
					))}
				</ul>
			</div>

			<div className="border-t border-[color:var(--rule)] pt-12 mt-12">
				<h2 className="section-title">
					start here
				</h2>
				<ul className="mt-8">
					{startHere.map((item) => (
						<li key={item.href} className="mb-6">
							<Link href={item.href} className="prose-link text-xl">
								{item.title}
							</Link>
							<p className="text-[color:var(--muted)] mt-1">{item.note}</p>
						</li>
					))}
				</ul>
			</div>

			<div className="border-t border-[color:var(--rule)] pt-8 mt-8 text-[color:var(--fg)]">
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
