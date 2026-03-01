"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationLinks as navLinks } from "./navigation-links";

export const Navigation: React.FC = () => {
	const pathname = usePathname();

	return (
		<header className="text-lg max-w-3xl mx-auto h-18 px-6 flex mt-0 justify-between items-center">
			<div>
				<Link
					href="/"
					className="nav-link font-medium text-xl hover:text-gray-800"
				>
					mohammed firdous
				</Link>
			</div>
			<div className="flex gap-6">
				{navLinks.map((link) => (
					<Link
						key={link.href}
						href={link.href}
						className={`nav-link ${
							pathname.includes(link.href)
								? "text-sky-600"
								: "opacity-60 hover:opacity-100"
						}`}
					>
						{link.name}
					</Link>
				))}
			</div>
		</header>
	);
};
