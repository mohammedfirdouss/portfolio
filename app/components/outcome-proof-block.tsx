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

	return (
		<section className="mb-10 rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
			<div className="grid gap-6 sm:grid-cols-3">
				<div>
					<h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
						Results
					</h2>
					<ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
						{outcomes.map((item) => (
							<li key={item}>{item}</li>
						))}
					</ul>
				</div>
				<div>
					<h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
						My Role
					</h2>
					<ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
						{roleHighlights.map((item) => (
							<li key={item}>{item}</li>
						))}
					</ul>
				</div>
				<div>
					<h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
						Links
					</h2>
					<ul className="space-y-1 text-sm">
						{proofLinks.map((item) => {
							const isExternal = /^https?:\/\//.test(item.href);
							return (
								<li key={`${item.label}-${item.href}`}>
									{isExternal ? (
										<a
											href={item.href}
											target="_blank"
											rel="noopener noreferrer"
											className="text-sky-700 hover:underline"
										>
											{item.label} →
										</a>
									) : (
										<Link
											href={item.href}
											className="text-sky-700 hover:underline"
										>
											{item.label} →
										</Link>
									)}
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</section>
	);
}
