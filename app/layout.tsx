import "../global.css";
import LocalFont from "next/font/local";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const AnalyticsWrapper = dynamic(
	() => import("./components/analytics-wrapper"),
	{
		ssr: false,
	},
);

const CustomCursor = dynamic(() => import("./components/custom-cursor"), {
	ssr: false,
});

const SmoothScroll = dynamic(() => import("./components/smooth-scroll"), {
	ssr: false,
});

const ScrollProgress = dynamic(() => import("./components/scroll-progress"), {
	ssr: false,
});

const CommandPalette = dynamic(
	() =>
		import("./components/command-palette").then((mod) => ({
			default: mod.CommandPalette,
		})),
	{
		ssr: false,
	},
);

const BackToTop = dynamic(
	() =>
		import("./components/back-to-top").then((mod) => ({
			default: mod.BackToTop,
		})),
	{
		ssr: false,
	},
);

const GrainOverlay = dynamic(
	() =>
		import("./components/noise-texture").then((mod) => ({
			default: mod.GrainOverlay,
		})),
	{
		ssr: false,
	},
);

const PageTransition = dynamic(
	() =>
		import("./components/page-transition").then((mod) => ({
			default: mod.PageTransition,
		})),
	{
		ssr: false,
	},
);

const TerminalModal = dynamic(
	() =>
		import("./components/terminal-modal").then((mod) => ({
			default: mod.TerminalModal,
		})),
	{
		ssr: false,
	},
);

const Footer = dynamic(() => import("./components/footer"), {
	ssr: false,
});

export const metadata: Metadata = {
	metadataBase: new URL(
		process.env.NEXT_PUBLIC_SITE_URL || "https://mohammedfirdous.me",
	),
	title: {
		default: "Mohammed Firdous",
		template: "%s | Mohammed Firdous",
	},
	description:
		"Portfolio of Mohammed Firdous — Cloud Engineer building infrastructure, AI systems, and open source tools.",
	openGraph: {
		title: "Mohammed Firdous",
		description:
			"Cloud Engineer building infrastructure, AI systems, and open source tools.",
		url: "https://mohammedfirdous.me",
		siteName: "Mohammed Firdous",
		images: [
			{
				url: "/favicon.png",
				width: 512,
				height: 512,
			},
		],
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
		description:
			"Cloud Engineer building infrastructure, AI systems, and open source tools.",
		images: "/favicon.png",
	},
	icons: {
		shortcut: "/favicon.png",
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
		<html
			lang="en"
			className={[inter.variable, calSans.variable].join(" ")}
			suppressHydrationWarning
		>
			<head>
				<AnalyticsWrapper />
				{/* Prevent FOUC by setting dark background immediately */}
				<script
					dangerouslySetInnerHTML={{
						__html: `
              (function() {
                document.documentElement.style.backgroundColor = '#000';
                document.documentElement.style.colorScheme = 'dark';
              })();
            `,
					}}
				/>
				<style
					dangerouslySetInnerHTML={{
						__html: `
              html { background-color: #000; }
              body { background-color: #000; visibility: visible; }
            `,
					}}
				/>
			</head>
			<body
				className={`bg-black ${
					process.env.NODE_ENV === "development" ? "" : undefined
				}`}
			>
				<SmoothScroll>
					<GrainOverlay />
					<ScrollProgress />
					<CustomCursor />
					<CommandPalette />
					<BackToTop />
					<PageTransition>{children}</PageTransition>
					<Footer />
					<TerminalModal />
				</SmoothScroll>
			</body>
		</html>
	);
}
