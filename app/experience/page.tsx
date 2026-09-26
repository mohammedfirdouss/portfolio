import { allExperiences } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";

export const metadata = {
	title: "Experience",
};

export default function ExperiencePage() {
	const experiences = allExperiences.sort(
		(a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
	);

	return (
		<div>
			<h1 className="page-title">experience</h1>
			<div>
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
						<section key={exp.slug} className="mb-7">
							<h2 className="post-title">
								{exp.role}
							</h2>
							<p className="post-meta !mb-0">
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
							</p>
							<p className="post-meta">
								{start} – {end}
							</p>
							<p className="mb-4">{exp.description}</p>
							{exp.body?.code && (
								<div>
									<Mdx code={exp.body.code} />
								</div>
							)}
							<hr />
						</section>
					);
				})}
			</div>
		</div>
	);
}
