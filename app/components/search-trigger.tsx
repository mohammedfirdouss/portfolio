"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type SearchItem = {
	title: string;
	description: string;
	href: string;
	type: string;
	tags?: string[];
	external?: boolean;
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function SearchTrigger() {
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [items, setItems] = useState<SearchItem[] | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const router = useRouter();

	useEffect(() => {
		function onKeyDown(e: KeyboardEvent) {
			const target = e.target as HTMLElement;
			const isTyping =
				target.tagName === "INPUT" ||
				target.tagName === "TEXTAREA" ||
				target.isContentEditable;

			if (e.key === "Escape") {
				setOpen(false);
				return;
			}
			if ((e.key === "/" && !isTyping) || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")) {
				e.preventDefault();
				setOpen(true);
			}
		}
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, []);

	useEffect(() => {
		if (open && items === null) {
			fetch(`${basePath}/search-index.json`)
				.then((res) => res.json())
				.then(setItems)
				.catch(() => setItems([]));
		}
		if (open) {
			const id = requestAnimationFrame(() => inputRef.current?.focus());
			return () => cancelAnimationFrame(id);
		}
		setQuery("");
	}, [open, items]);

	const results = (() => {
		if (!items) return [];
		const q = query.trim().toLowerCase();
		if (!q) return items.slice(0, 8);
		return items
			.filter((item) =>
				[item.title, item.description, item.type, ...(item.tags ?? [])]
					.join(" ")
					.toLowerCase()
					.includes(q),
			)
			.slice(0, 20);
	})();

	function go(item: SearchItem) {
		setOpen(false);
		if (item.external) {
			window.open(item.href, "_blank", "noopener,noreferrer");
		} else {
			router.push(item.href);
		}
	}

	return (
		<>
			<button
				type="button"
				onClick={() => setOpen(true)}
				className="link-button"
			>
				search
			</button>
			{open && (
				<div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
					<button
						type="button"
						aria-label="Close search"
						tabIndex={-1}
						className="absolute inset-0 bg-black/30 cursor-default"
						onClick={() => setOpen(false)}
					/>
					<div className="relative w-full max-w-lg bg-[color:var(--bg)] rounded shadow-xl border border-[color:var(--rule)] overflow-hidden">
						<div className="flex items-center gap-2 px-4 py-3 border-b border-[color:var(--rule)] text-sm text-[color:var(--muted)]">
							<span>grep</span>
							<input
								ref={inputRef}
								value={query}
								onChange={(e) => setQuery(e.target.value)}
								placeholder="search posts, projects, talks..."
								className="flex-1 outline-none bg-transparent text-[color:var(--fg)] text-base"
							/>
							<kbd className="text-xs border border-[color:var(--rule)] rounded px-1.5 py-0.5">
								esc
							</kbd>
						</div>
						<div className="max-h-96 overflow-y-auto">
							{items === null ? (
								<div className="px-4 py-6 text-sm text-[color:var(--muted)]">
									Loading…
								</div>
							) : results.length === 0 ? (
								<div className="px-4 py-6 text-sm text-[color:var(--muted)]">
									No matches.
								</div>
							) : (
								results.map((item) => (
									<button
										key={`${item.type}-${item.href}`}
										type="button"
										onClick={() => go(item)}
										className="w-full text-left px-4 py-3 hover:bg-[color:var(--code-bg)] border-b border-[color:var(--rule)] last:border-0"
									>
										<div className="flex items-center gap-2">
											<span className="text-xs uppercase tracking-wide text-[color:var(--muted)]">
												{item.type}
											</span>
											<span className="text-[color:var(--link)] font-bold">
												{item.title}
											</span>
											{item.external && (
												<span className="text-[color:var(--muted)] text-xs">↗</span>
											)}
										</div>
										{item.description && (
											<div className="text-sm text-[color:var(--muted)] mt-0.5 line-clamp-1">
												{item.description}
											</div>
										)}
									</button>
								))
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
}
