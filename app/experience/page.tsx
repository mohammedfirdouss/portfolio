import { allExperiences } from "contentlayer/generated";

export const metadata = {
	title: "Experience",
};

export default function ExperiencePage() {
	const experiences = allExperiences.sort(
		(a, b) =>
			new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
	);

	return (
		<div>
			<h1 className="font-display text-8xl text-gray-200 mb-8">experience</h1>
			<div className="space-y-10">
				{experiences.map((exp) => {
					const start = new Date(exp.startDate).toLocaleDateString("en-us", {
						year: "numeric",
						month: "short",
					});
					const end = exp.endDate
						? new Date(exp.endDate).toLocaleDateString("en-us", {
								year: "numeric",
								month: "short",
							})
						: "Present";

					return (
						<div key={exp.slug}>
							<h2 className="text-lg font-semibold text-gray-900">
								{exp.role}
							</h2>
							<div className="text-sm text-gray-500 mt-1">
								{exp.companyUrl ? (
									<a
										href={exp.companyUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="prose-link"
									>
										{exp.company}
									</a>
								) : (
									exp.company
								)}
								{exp.location && <span> · {exp.location}</span>}
							</div>
							<div className="text-sm text-gray-400 mt-1">
								{start} — {end}
							</div>
							<p className="text-gray-600 mt-2">{exp.description}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}
