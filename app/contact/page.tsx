"use client";
import Github from "lucide-react/dist/esm/icons/github";
import Mail from "lucide-react/dist/esm/icons/mail";
import Twitter from "lucide-react/dist/esm/icons/twitter";
import Linkedin from "lucide-react/dist/esm/icons/linkedin";
import Link from "next/link";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";

const socials = [
	{
		icon: <Linkedin size={20} />,
		href: "https://www.linkedin.com/in/mohammedfirdousaraoye/",
		label: "LinkedIn",
		handle: "mohammedfirdousaraoye",
	},
	{
		icon: <Mail size={20} />,
		href: "mailto:mohammedfirdous682@gmail.com",
		label: "Email",
		handle: "mohammedfirdous..", // Truncated for better display
	},
	{
		icon: <Github size={20} />,
		href: "https://github.com/mohammedfirdouss",
		label: "Github",
		handle: "mohammedfirdouss",
	},
	null, // Placeholder for the first column of the second row
	{
		icon: <Twitter size={20} />,
		href: "https://twitter.com/iamfirdouss",
		label: "Twitter",
		handle: "@iamfirdouss",
	},
];

export default function Example() {
	return (
		<div className=" bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
			<Navigation />
			<div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
				<div className="max-w-2xl mx-auto lg:mx-0">
					<h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
						Contact
					</h2>
					<p className="mt-4 text-zinc-400">
						Get in touch with me through the following socials.
					</p>
				</div>
				<div className="w-full h-px bg-zinc-800" />
			</div>
			<div className="container flex items-center justify-center min-h-screen px-4 mx-auto">
				<div className="grid w-full grid-cols-1 gap-8 mx-auto mt-32 sm:mt-0 sm:grid-cols-3 lg:gap-16">
					{socials.map((s, index) => (
    s ? (
        <Card key={index}>
            <Link
                href={s.href}
                target="_blank"
                className="p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:py-24  lg:pb-48  md:p-16"
            >
                <span
                    className="absolute w-px h-2/3 bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent"
                    aria-hidden="true"
                />
                <span className="relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200 drop-shadow-orange">
                    {s.icon}
                </span>{" "}
                <div className="z-10 flex flex-col items-center">
                    <span className="lg:text-xl font-medium duration-150 xl:text-3xl text-zinc-200 group-hover:text-white font-display">
                        {s.handle}
                    </span>
                    <span className="mt-4 text-sm text-center duration-1000 text-zinc-400 group-hover:text-zinc-200">
                        {s.label}
                    </span>
                </div>
            </Link>
        </Card>
    ) : (
        <div key={index} className="hidden sm:block" />
    )
))}
				</div>
			</div>
		</div>
	);
}
