import Link from "next/link";
import { Fragment } from "react";
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

const pageLinks = [
	{ text: "talks", href: "/talks" },
	{ text: "diagrams", href: "/diagrams" },
	{ text: "uses", href: "/uses" },
	{ text: "tags", href: "/tags" },
	{ text: "rss", href: "/rss.xml" },
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
				{pageLinks.map((link, i) => (
					<Fragment key={link.text}>
						{i > 0 && sep}
						<Link href={link.href}>{link.text}</Link>
					</Fragment>
				))}
				{sep}
				<SearchTrigger />
			</p>
		</footer>
	);
}
