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
		<section className="mb-10 border-t border-b border-gray-200 py-6">
			<div className="space-y-6">
				{sections.map(
					(section) =>
						section.items.length > 0 && (
							<div key={section.title}>
								<h2 className="text-sm font-semibold text-gray-900 mb-2">
									{section.title}
								</h2>
								<ul className="list-disc pl-5 space-y-2 text-base leading-relaxed text-gray-700">
									{section.items.map((item) => (
										<li key={item}>{item}</li>
									))}
								</ul>
							</div>
						),
				)}
				{proofLinks.length > 0 && (
					<div>
						<h2 className="text-sm font-semibold text-gray-900 mb-2">Links</h2>
						<div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
							{proofLinks.map((item) => {
								const isExternal = /^https?:\/\//.test(item.href);
								const className = "text-sky-700 hover:underline";
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
						</div>
					</div>
				)}
			</div>
		</section>
	);
}
