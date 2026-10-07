import "../global.css";
import LocalFont from "next/font/local";
import Script from "next/script";
import { Metadata } from "next";
import { Navigation } from "./components/nav";
import Footer from "./components/footer";
import { siteUrl } from "./lib/site";

const description =
	"Software engineer working on cloud infrastructure and AI, with a focus on agents. Maintainer and LFX Mentor for PipeCD (CNCF) and open source contributor.";

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: "Mohammed Firdous",
		template: "%s | Mohammed Firdous",
	},
	description,
	authors: [{ name: "Mohammed Firdous", url: siteUrl }],
	creator: "Mohammed Firdous",
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


export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={inter.variable}>
			<body className="min-h-screen w-full">
				<div className="site-shell">
					<Navigation />
					<main>{children}</main>
					<Footer />
				</div>
				{process.env.NEXT_PUBLIC_CF_BEACON_TOKEN && (
					<Script
						src="https://static.cloudflareinsights.com/beacon.min.js"
						data-cf-beacon={JSON.stringify({
							token: process.env.NEXT_PUBLIC_CF_BEACON_TOKEN,
						})}
						strategy="lazyOnload"
					/>
				)}
			</body>
		</html>
	);
}
