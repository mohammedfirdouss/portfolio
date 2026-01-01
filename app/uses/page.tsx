import { Mdx } from "@/app/components/mdx";
import { Navigation } from "@/app/components/nav";
import { Card } from "@/app/components/card";
import { Laptop, Cpu, Command } from "lucide-react";
import { allDocuments } from "contentlayer/generated";
import { notFound } from "next/navigation";

export default function UsesPage() {
	const doc = allDocuments.find((doc) => doc._raw.sourceFilePath === "uses/index.mdx");
	
	if (!doc) return notFound();

	return (
		<div className="relative min-h-screen bg-black">
			{/* Background effects */}
			<div className="absolute inset-0 bg-gradient-to-br from-zinc-900/30 via-black to-zinc-900/20" />
			<div className="absolute inset-0 opacity-[0.02] bg-[url('/noise.png')] mix-blend-overlay" />
			
			<Navigation />

			<div className="relative z-10 px-6 pt-24 mx-auto space-y-8 max-w-4xl lg:px-8 md:space-y-16 md:pt-32 lg:pt-40">
				
				{/* Header */}
				<div className="max-w-2xl">
					<div className="h-px w-16 bg-gradient-to-r from-zinc-500 to-transparent mb-8" />
					<div className="flex items-center gap-3 mb-4">
						<Laptop className="w-5 h-5 text-zinc-400" />
						<span className="text-sm font-medium tracking-widest uppercase text-zinc-400">
							The Arsenal
						</span>
					</div>
					<h1 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl font-display">
						/uses
					</h1>
					<p className="mt-6 text-lg text-zinc-400 leading-relaxed">
						Hardware, software, and tools I rely on to design, build, and deploy.
					</p>
				</div>

				<div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

				{/* Main Content */}
				<div className="grid gap-8">
					<Card>
						<article className="p-8 md:p-12 prose prose-invert prose-zinc max-w-none">
							<Mdx code={doc.body.code} />
						</article>
					</Card>
				</div>

				{/* Footer Quote */}
				<div className="flex items-center gap-4 p-6 border border-zinc-800/50 rounded-2xl bg-zinc-900/20 backdrop-blur-sm">
					<div className="p-3 rounded-full bg-zinc-800/50">
						<Command className="w-6 h-6 text-zinc-400" />
					</div>
					<div>
						<p className="text-sm font-medium text-zinc-200">
							"Tools magnify the intent of the user."
						</p>
						<p className="text-xs text-zinc-500">
							Curated list • Updated {new Date().getFullYear()}
						</p>
					</div>
				</div>

			</div>
			
			<div className="h-24" />
		</div>
	);
}
