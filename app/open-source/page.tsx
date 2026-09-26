import Link from "next/link";
import { allOpenSources, type OpenSource } from "contentlayer/generated";

export const metadata = {
	title: "Open Source",
	description:
		"Contributions to open source projects, bug fixes, documentation, features, and mentorship through programs like LFX.",
};

export default function OpenSourcePage() {
	const contributions = allOpenSources
		.filter((c) => c.published !== false)
		.sort(
			(a, b) =>
				new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime(),
		);

	const featured = contributions.filter((c) => c.featured);
	const rest = contributions.filter((c) => !c.featured);

	return (
		<div>
			<h1 className="page-title">open source</h1>
			<div className="mb-12">
				<p>I contribute where I can, mostly CNCF and cloud-native projects.</p>
			</div>

			{featured.length > 0 && (
				<div className="mb-12">
					<h2 className="section-title">
						notable
					</h2>
					<div>
						{featured.map((contrib) => (
							<div key={contrib.slug}>
								<ContributionRow contrib={contrib} />
							</div>
						))}
					</div>
				</div>
			)}

			{rest.length > 0 && (
				<div>
					<h2 className="section-title">
						all contributions
					</h2>
					<div>
						{rest.map((contrib) => (
							<div key={contrib.slug}>
								<ContributionRow contrib={contrib} />
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

function ContributionRow({ contrib }: { contrib: OpenSource }) {
	const meta = [
		contrib.project,
		contrib.date &&
			new Date(contrib.date).toLocaleDateString("en-us", {
				year: "numeric",
				month: "long",
			}),
	].filter(Boolean);

	return (
		<article>
			<h3 className="post-title">
				<Link href={`/open-source/${contrib.slug}`} className="prose-link">
					{contrib.title}
				</Link>
			</h3>
			<p className="post-meta">{meta.join(" │ ")}</p>
		</article>
	);
}
