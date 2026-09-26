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
			<h1 className="page-title">
				uses
			</h1>
			<div className="mb-8">
				<p className="text-[color:var(--muted)] text-lg">
					{page.description}
				</p>
				{page.updatedAt && (
					<p className="text-[color:var(--muted)] mt-2 text-sm">
						Last updated{" "}
						{new Date(page.updatedAt).toLocaleDateString("en-us", {
							year: "numeric",
							month: "long",
						})}
					</p>
				)}
			</div>
			<article>
				<Mdx code={page.body.code} />
			</article>
		</div>
	);
}
