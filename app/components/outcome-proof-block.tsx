import Link from "next/link";

type ProofLink = {
	label: string;
	href: string;
};

type Props = {
	outcomes?: string[];
	roleHighlights?: string[];
	proofLinks?: ProofLink[];
};

export function OutcomeProofBlock({
	outcomes = [],
	roleHighlights = [],
	proofLinks = [],
}: Props) {
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
