import Link from "next/link";
import { repositoryUrl } from "@/app/components/post-layout";

type ProofLink = {
	label: string;
	href: string;
};

type Props = {
	outcomes?: string[];
	roleHighlights?: string[];
	proofLinks?: ProofLink[];
	// Already linked as "source" in the header, so it is left out of Links.
	repository?: string;
};

export function OutcomeProofBlock({
	outcomes = [],
	roleHighlights = [],
	proofLinks: allProofLinks = [],
	repository,
}: Props) {
	const headerLink = repository && repositoryUrl(repository).replace(/\/$/, "");
	const proofLinks = allProofLinks.filter(
		(item) => item.href.replace(/\/$/, "") !== headerLink,
	);

	if (
		outcomes.length === 0 &&
		roleHighlights.length === 0 &&
		proofLinks.length === 0
	) {
		return null;
	}

	const sections = [
		{
			title: "What changed",
			items: outcomes,
		},
		{
			title: "What I worked on",
			items: roleHighlights,
		},
	];

	return (
		<section className="post-body mb-7">
			<div>
				{sections.map(
					(section) =>
						section.items.length > 0 && (
							<div key={section.title}>
								<h2 className="proof-heading">
									{section.title}
								</h2>
								<ul>
									{section.items.map((item) => (
										<li key={item}>{item}</li>
									))}
								</ul>
							</div>
						),
				)}
				{proofLinks.length > 0 && (
					<div>
						<h2 className="proof-heading">Links</h2>
						<p>
							{proofLinks.map((item) => {
								const isExternal = /^https?:\/\//.test(item.href);
								const className = "mr-4";
								return isExternal ? (
									<a
										key={`${item.label}-${item.href}`}
										href={item.href}
										target="_blank"
										rel="noopener noreferrer"
										className={className}
									>
										{item.label}
									</a>
								) : (
									<Link
										key={`${item.label}-${item.href}`}
										href={item.href}
										className={className}
									>
										{item.label}
									</Link>
								);
							})}
						</p>
					</div>
				)}
			</div>
		</section>
	);
}
