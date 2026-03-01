import { allCertifications } from "contentlayer/generated";

export const metadata = {
	title: "Certifications",
};

export default function CertificationsPage() {
	const certs = allCertifications.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	);

	return (
		<div>
			<h1 className="font-display text-8xl text-gray-200 mb-8">
				certifications
			</h1>
			<div className="space-y-6">
				{certs.map((cert) => (
					<div key={cert.slug}>
						<h2 className="text-lg font-semibold text-gray-900">
							{cert.credentialUrl ? (
								<a
									href={cert.credentialUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="prose-link"
								>
									{cert.title}
								</a>
							) : (
								cert.title
							)}
						</h2>
						<div className="text-sm text-gray-500 mt-1">
							{cert.organization} ·{" "}
							{new Date(cert.date).toLocaleDateString("en-us", {
								year: "numeric",
								month: "short",
							})}
						</div>
						{cert.credentialId && (
							<div className="text-xs text-gray-400 mt-1">
								ID: {cert.credentialId}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
