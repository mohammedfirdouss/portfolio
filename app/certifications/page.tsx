import { allCertifications } from "contentlayer/generated";

export const metadata = {
	title: "Certifications",
	description:
		"Cloud and infrastructure certifications — AWS, Kubernetes, and more.",
};

export default function CertificationsPage() {
	const certs = allCertifications.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	);

	return (
		<div>
			<h1 className="font-display text-5xl sm:text-6xl md:text-7xl xl:text-8xl text-gray-200 mb-8">
				certifications
			</h1>
			<div className="divide-y divide-gray-100">
				{certs.map((cert) => {
					const inner = (
						<>
							<h2 className="text-lg font-semibold text-gray-900 group-hover:text-sky-600 transition-colors">
								{cert.title}
							</h2>
							<div className="text-sm text-gray-500 mt-1">
								{cert.organization} ·{" "}
								{new Date(cert.date).toLocaleDateString("en-us", {
									year: "numeric",
									month: "short",
								})}
							</div>
						</>
					);

					return cert.credentialUrl ? (
						<a
							key={cert.slug}
							href={cert.credentialUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="block group pt-6 first:pt-0"
						>
							{inner}
						</a>
					) : (
						<div key={cert.slug} className="pt-6 first:pt-0">{inner}</div>
					);
				})}
			</div>
		</div>
	);
}
