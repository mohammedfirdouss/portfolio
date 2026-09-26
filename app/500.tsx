import Link from "next/link";

export default function Error500() {
	return (
		<div className="flex flex-col items-center justify-center py-24 text-center">
			<h1 className="page-title">500</h1>
			<h2 className="text-2xl font-bold text-[color:var(--fg)] mb-4">Server error</h2>
			<p className="text-lg text-[color:var(--muted)] mb-8">
				Something went wrong on our end. Try refreshing.
			</p>
			<Link href="/" className="prose-link text-lg">
				cd ~
			</Link>
		</div>
	);
}
