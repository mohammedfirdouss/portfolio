"use client";

import { useEffect, useState } from "react";

type TocItem = { value: string; depth: number; slug: string };

function useActiveHeading(toc: TocItem[]) {
	const [activeSlug, setActiveSlug] = useState<string | null>(
		toc[0]?.slug ?? null,
	);

	useEffect(() => {
		const headingElements = toc
			.map((item) => document.getElementById(item.slug))
			.filter((el): el is HTMLElement => el !== null);

		if (headingElements.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

				if (visible[0]) {
					setActiveSlug(visible[0].target.id);
				}
			},
			{ rootMargin: "-96px 0px -70% 0px", threshold: 1.0 },
		);

		headingElements.forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	}, [toc]);

	return activeSlug;
}

function TocList({
	toc,
	activeSlug,
	onNavigate,
	truncateLabels = false,
}: {
	toc: TocItem[];
	activeSlug: string | null;
	onNavigate?: () => void;
	truncateLabels?: boolean;
}) {
	return (
		<ul className="space-y-1 border-l border-gray-200">
			{toc.map((item) => {
				const isActive = item.slug === activeSlug;
				return (
					<li key={item.slug}>
						<a
							href={`#${item.slug}`}
							onClick={onNavigate}
							title={truncateLabels ? item.value : undefined}
							className={`block -ml-px border-l-2 py-1.5 transition-colors ${
								truncateLabels ? "truncate" : ""
							} ${item.depth === 3 ? "pl-6" : "pl-3"} ${
								isActive
									? "rounded-r border-sky-600 bg-sky-50 font-medium text-sky-700"
									: "border-transparent text-gray-500 hover:text-gray-800"
							}`}
						>
							{item.value}
						</a>
					</li>
				);
			})}
		</ul>
	);
}

// Sticky sidebar version — used on wide (xl+) viewports.
export function TableOfContents({ toc }: { toc: TocItem[] }) {
	const activeSlug = useActiveHeading(toc);

	if (toc.length < 2) return null;

	return (
		<nav aria-label="Table of contents" className="text-sm">
			<p className="font-semibold text-gray-900 mb-3">Table of Contents</p>
			<TocList toc={toc} activeSlug={activeSlug} truncateLabels />
		</nav>
	);
}

// Collapsible version — used below the xl breakpoint, where there's no
// room for a fixed sidebar.
export function MobileTableOfContents({ toc }: { toc: TocItem[] }) {
	const activeSlug = useActiveHeading(toc);
	const [open, setOpen] = useState(false);

	if (toc.length < 2) return null;

	return (
		<details
			className="mb-8 rounded-lg border border-gray-200 xl:hidden"
			open={open}
			onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
		>
			<summary className="cursor-pointer select-none px-4 py-3 text-sm font-semibold text-gray-900">
				Table of Contents
			</summary>
			<nav aria-label="Table of contents" className="px-4 pb-4 text-sm">
				<TocList
					toc={toc}
					activeSlug={activeSlug}
					onNavigate={() => setOpen(false)}
				/>
			</nav>
		</details>
	);
}
