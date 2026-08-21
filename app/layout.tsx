import "../global.css";
import LocalFont from "next/font/local";
import { Metadata } from "next";
import { Navigation } from "./components/nav";
import Footer from "./components/footer";
import { siteUrl } from "./lib/site";

const description =
	"Software engineer focused on cloud infrastructure and AI, building open source software.";

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: "Mohammed Firdous",
		template: "%s | Mohammed Firdous",
	},
	description,
	openGraph: {
		title: "Mohammed Firdous",
		description,
		url: siteUrl,
		siteName: "Mohammed Firdous",
		images: [{ url: "/opengraph-image" }],
		locale: "en-US",
		type: "website",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	twitter: {
		title: "Mohammed Firdous",
		card: "summary_large_image",
		description,
		images: ["/opengraph-image"],
	},
	icons: {
		icon: "/favicon.svg",
	},
	alternates: {
		types: {
			"application/rss+xml": "/rss.xml",
		},
	},
};
const inter = LocalFont({
	src: "../public/fonts/Inter-VariableFont.woff2",
	weight: "100 900",
	variable: "--font-inter",
	display: "swap",
});

const calSans = LocalFont({
	src: "../public/fonts/CalSans-SemiBold.ttf",
	variable: "--font-calsans",
	display: "swap",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
			<body className="bg-white text-gray-800 dark:bg-gray-950 dark:text-gray-300 min-h-screen font-sans w-full">
				<Navigation />
				<main className="grow mx-auto py-10 px-6 max-w-3xl">{children}</main>
				<Footer />
			</body>
		</html>
	);
}
