import { notFound } from "next/navigation";
import { Mdx } from "@/app/components/mdx";
import { allPages } from "contentlayer/generated";

export const metadata = {
	title: "Uses",
	description: "Hardware, software, and tools I rely on to design, build, and deploy.",
};

export default function UsesPage() {
	const page = allPages.find(
		(entry) => entry._raw.flattenedPath === "uses/index",
	);

	if (!page) {
		notFound();
	}

	return (
		<div>
			<h1 className="font-display text-5xl sm:text-6xl md:text-7xl xl:text-8xl text-gray-200 dark:text-gray-800 mb-8">
				uses
			</h1>
			<div className="mb-8">
				<p className="text-gray-500 dark:text-gray-400 text-lg">
					{page.description}
				</p>
				{page.updatedAt && (
					<p className="text-gray-400 dark:text-gray-500 mt-2 text-sm">
						Last updated{" "}
						{new Date(page.updatedAt).toLocaleDateString("en-us", {
							year: "numeric",
							month: "long",
						})}
					</p>
				)}
			</div>
			<article className="prose max-w-none">
				<Mdx code={page.body.code} />
			</article>
		</div>
	);
}
