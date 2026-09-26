"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import {
	navigationLinks as navLinks,
	secondaryLinks,
} from "./navigation-links";
import { SearchTrigger } from "./search-trigger";
import { newsletterUrl } from "../lib/site";
import { withBasePath } from "../lib/asset-path";

export const Navigation: React.FC = () => {
	const pathname = usePathname();
	const isHome = pathname === "/";

	return (
		<header className="site-header">
			{isHome ? (
				<h1 className="site-title">
					<Link href="/">mohammed firdous</Link>
				</h1>
			) : (
				<p className="site-title site-title--small">
					<Link href="/">mohammed firdous</Link>
				</p>
			)}
			<nav className="site-nav">
				{newsletterUrl ? (
					<a href={newsletterUrl} target="_blank" rel="noopener noreferrer">
						subscribe
					</a>
				) : (
					<a href={withBasePath("/rss.xml")}>subscribe</a>
				)}
				{navLinks.map((link) => (
					<Fragment key={link.href}>
						<span aria-hidden="true"> │ </span>
						<Link
							href={link.href}
							aria-current={
								pathname?.startsWith(link.href) ? "page" : undefined
							}
						>
							{link.name}
						</Link>
					</Fragment>
				))}
			</nav>
			<nav className="site-nav" aria-label="More">
				{secondaryLinks.map((link) => (
					<Fragment key={link.href}>
						<Link
							href={link.href}
							aria-current={
								pathname?.startsWith(link.href) ? "page" : undefined
							}
						>
							{link.name}
						</Link>
						<span aria-hidden="true"> │ </span>
					</Fragment>
				))}
				<SearchTrigger />
			</nav>
			<hr />
		</header>
	);
};
