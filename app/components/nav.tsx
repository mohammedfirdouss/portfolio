"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationLinks as navLinks } from "./navigation-links";

export const Navigation: React.FC = () => {
	const pathname = usePathname();

	return (
		<header className="text-lg max-w-3xl mx-auto px-6 flex flex-wrap mt-8 justify-between items-center gap-x-6 gap-y-3">
			<div className="flex-shrink-0">
				<Link
					href="/"
					className="nav-link font-medium text-xl hover:text-gray-800"
				>
					mohammed firdous
				</Link>
			</div>
			<nav className="flex flex-wrap gap-6 justify-end">
				{navLinks.map((link) => (
					<Link
						key={link.href}
						href={link.href}
						className={`nav-link ${
							pathname?.includes(link.href)
								? "text-sky-600"
								: "opacity-60 hover:opacity-100"
						}`}
					>
						{link.name}
					</Link>
				))}
			</nav>
		</header>
	);
};
