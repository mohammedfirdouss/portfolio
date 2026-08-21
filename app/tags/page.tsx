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
			<h1 className="font-display text-5xl sm:text-6xl md:text-7xl xl:text-8xl text-gray-200 dark:text-gray-800 mb-8">
				tags
			</h1>
			<div className="flex flex-wrap gap-3">
				{tags.map(([slug, { label, posts }]) => (
					<Link
						key={slug}
						href={`/tags/${slug}`}
						className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 text-sky-600 dark:text-sky-400 rounded-full hover:bg-gray-200 hover:dark:bg-gray-700 transition-colors"
					>
						{label}
						<span className="text-gray-400 dark:text-gray-500">{posts.length}</span>
					</Link>
				))}
			</div>
		</div>
	);
}
