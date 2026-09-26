import Link from "next/link";
import { Fragment } from "react";
import { footerLinks } from "./navigation-links";
import { SearchTrigger } from "./search-trigger";

const socialLinks = [
	{
		text: "github",
		href: "https://github.com/mohammedfirdouss",
	},
	{
		text: "gitlab",
		href: "https://gitlab.com/mohammedfirdouss",
	},
	{
		text: "hugging face",
		href: "https://huggingface.co/mohammedfirdouss",
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

const sep = <span aria-hidden="true"> │ </span>;

export default function Footer() {
	return (
		<footer className="site-footer">
			<hr />
			<p>
				{socialLinks.map((link, i) => (
					<Fragment key={link.text}>
						{i > 0 && sep}
						<a href={link.href} target="_blank" rel="noopener noreferrer">
							{link.text}
						</a>
					</Fragment>
				))}
			</p>
			<p>
				{footerLinks.map((link) => (
					<Fragment key={link.href}>
						<Link href={link.href}>{link.name}</Link>
						{sep}
					</Fragment>
				))}
				<SearchTrigger />
			</p>
		</footer>
	);
}
