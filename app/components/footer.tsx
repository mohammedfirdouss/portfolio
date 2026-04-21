import Link from "next/link";

const socialLinks = [
	{
		text: "github",
		href: "https://github.com/mohammedfirdouss",
	},
	{
		text: "linkedin",
		href: "https://www.linkedin.com/in/mohammedfirdousaraoye/",
	},
	{
		text: "twitter",
		href: "https://twitter.com/iamfirdouss",
	},
];

const pageLinks = [
	{ text: "experience", href: "/experience" },
	{ text: "certifications", href: "/certifications" },
	{ text: "systems design", href: "/systems-design" },
];

export default function Footer() {
	return (
		<footer className="w-full px-6 pt-4 pb-12 max-w-3xl mx-auto">
			<div className="flex flex-wrap gap-x-4 gap-y-2 mb-3">
				{socialLinks.map((link) => (
					<a
						key={link.text}
						href={link.href}
						target="_blank"
						rel="noopener noreferrer"
						className="prose-link"
					>
						{link.text}
					</a>
				))}
			</div>
			<div className="flex flex-wrap gap-x-4 gap-y-2">
				{pageLinks.map((link) => (
					<Link key={link.text} href={link.href} className="prose-link text-sm text-gray-400">
						{link.text}
					</Link>
				))}
			</div>
		</footer>
	);
}
