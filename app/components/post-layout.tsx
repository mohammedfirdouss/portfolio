import Link from "next/link";
import { Fragment } from "react";

type NavLink = { href: string; label: string };

export function repositoryUrl(repository: string) {
	return repository.startsWith("http")
		? repository
		: `https://github.com/${repository}`;
}

export function PostHeader({
	title,
	meta,
	summary,
}: {
	title: string;
	meta: React.ReactNode[];
	summary?: string;
}) {
	const items = meta.filter(Boolean);
	return (
		<header className="post-header">
			<h1 className="page-title">{title}</h1>
			{items.length > 0 && (
				<p className="post-meta">
					{items.map((item, i) => (
						// rome-ignore lint/suspicious/noArrayIndexKey: meta items are positional and static
						<Fragment key={i}>
							{i > 0 && " │ "}
							{item}
						</Fragment>
					))}
				</p>
			)}
			{summary && <p className="post-summary">{summary}</p>}
		</header>
	);
}

export function PostFooter({
	previous,
	next,
}: {
	previous?: NavLink | null;
	next?: NavLink | null;
}) {
	return (
		<footer className="post-footer">
			<hr />
			<ul className="post-nav">
				<li>
					{previous && (
						<Link href={previous.href} rel="prev">
							← {previous.label}
						</Link>
					)}
				</li>
				<li>
					{next && (
						<Link href={next.href} rel="next">
							{next.label} →
						</Link>
					)}
				</li>
			</ul>
		</footer>
	);
}

/**
 * Older/newer neighbours of `slug` in a list of dated entries, as footer
 * links. `base` is the section path, e.g. "/projects".
 */
export function neighbours<
	T extends { slug: string; title: string; date?: string },
>(entries: T[], slug: string, base: string) {
	const sorted = [...entries].sort(
		(a, b) => new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime(),
	);
	const i = sorted.findIndex((e) => e.slug === slug);
	const link = (e?: T) => e && { href: `${base}/${e.slug}`, label: e.title };
	return {
		previous: i === -1 ? null : link(sorted[i + 1]),
		next: i > 0 ? link(sorted[i - 1]) : null,
	};
}

export function formatMonth(date: string) {
	return new Date(date).toLocaleDateString("en-us", {
		year: "numeric",
		month: "long",
	});
}
