import { Mdx } from "@/app/components/mdx";
import { Navigation } from "@/app/components/nav";
import { Card } from "@/app/components/card";
import { Laptop, Cpu, Command, Calendar } from "lucide-react";
import { notFound } from "next/navigation";
import { allPages } from "contentlayer/generated";

export default function UsesPage() {
	const uses = allPages.find(
		(page) =>
			page._raw.flattenedPath === "uses" ||
			page._raw.flattenedPath === "uses/index",
	);

	if (!uses) {
		notFound();
	}

	return (
		<div className="relative min-h-screen bg-black">
			<div className="absolute inset-0 bg-gradient-to-br from-zinc-900/30 via-black to-zinc-900/20" />
			<div className="absolute inset-0 opacity-[0.02] bg-[url('/noise.png')] mix-blend-overlay" />

			<Navigation />

			<div className="relative z-10 px-6 pt-24 mx-auto max-w-5xl space-y-8 md:space-y-16 md:pt-32 lg:pt-36">
				<div className="max-w-3xl">
					<div className="h-px w-16 bg-gradient-to-r from-zinc-500 to-transparent mb-8" />
					<div className="flex items-center gap-3 mb-4 text-zinc-500">
						<Laptop className="w-5 h-5" />
						<span className="text-sm font-medium tracking-widest uppercase">
							Tools & Stack
						</span>
					</div>
					<h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl font-display">
						Uses
					</h1>
					<p className="mt-4 text-lg text-zinc-300 leading-relaxed">
						Hardware, software, and workflows powering my day-to-day build
						process.
					</p>
					{uses.updatedAt && (
						<p className="mt-4 inline-flex items-center gap-2 text-sm text-zinc-500">
							<Calendar className="w-4 h-4" />
							Last updated{" "}
							{new Date(uses.updatedAt).toLocaleDateString("en-US", {
								month: "long",
								year: "numeric",
							})}
						</p>
					)}
				</div>

				<Card>
					<article className="p-6 md:p-10 prose prose-zinc prose-invert max-w-none">
						<div className="flex items-center gap-3 text-sm text-zinc-500 mb-6">
							<Cpu className="w-4 h-4" />
							<span>What I rely on to design, build, and ship</span>
						</div>
						<Mdx code={uses.body.code} />
						<div className="mt-8 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-zinc-500">
							<Command className="w-4 h-4" />
							Always evolving
						</div>
					</article>
				</Card>
			</div>
			<div className="h-24" />
		</div>
	);
}
