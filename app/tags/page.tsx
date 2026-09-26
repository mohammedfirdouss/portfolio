import Link from "next/link";
import { getTagIndex } from "@/app/lib/tags";

export const metadata = {
	title: "Tags",
	description: "Browse blog posts by topic.",
};

export default function TagsPage() {
	const tags = [...getTagIndex().entries()].sort(
		(a, b) =>
			b[1].posts.length - a[1].posts.length ||
			a[1].label.localeCompare(b[1].label),
	);

	return (
		<div>
			<h1 className="page-title">
				tags
			</h1>
			<div className="flex flex-wrap gap-3">
				{tags.map(([slug, { label, posts }]) => (
					<Link
						key={slug}
						href={`/tags/${slug}`}
						className="prose-link"
					>
						{label}{" "}
						<span className="text-[color:var(--muted)]">({posts.length})</span>
					</Link>
				))}
			</div>
		</div>
	);
}
