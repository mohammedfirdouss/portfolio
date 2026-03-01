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
		text: "x (twitter)",
		href: "https://twitter.com/iamfirdouss",
	},
];

export default function Footer() {
	return (
		<footer className="w-full px-6 pt-4 pb-12 max-w-3xl mx-auto">
			<div className="mb-6 flex flex-wrap gap-x-4 gap-y-2">
				{socialLinks.map((link) => (
					<a
						key={link.text}
						href={link.href}
						target="_blank"
						rel="noopener noreferrer"
						className="prose-link flex items-center"
					>
						<span>{link.text}</span>
					</a>
				))}
			</div>
		</footer>
	);
}
