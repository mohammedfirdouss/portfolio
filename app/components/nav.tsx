"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { navigationLinks as navLinks } from "./navigation-links";
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
			<hr />
		</header>
	);
};
