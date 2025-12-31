import "../global.css";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const AnalyticsWrapper = dynamic(() => import("./components/analytics-wrapper"), {
  ssr: false,
});

const CustomCursor = dynamic(() => import("./components/custom-cursor"), {
  ssr: false,
});

const SmoothScroll = dynamic(() => import("./components/smooth-scroll"), {
  ssr: false,
});

const ScrollProgress = dynamic(() => import("./components/scroll-progress"), {
  ssr: false,
});

const CommandPalette = dynamic(() => import("./components/command-palette").then(mod => ({ default: mod.CommandPalette })), {
  ssr: false,
});

const BackToTop = dynamic(() => import("./components/back-to-top").then(mod => ({ default: mod.BackToTop })), {
  ssr: false,
});

const GrainOverlay = dynamic(() => import("./components/noise-texture").then(mod => ({ default: mod.GrainOverlay })), {
  ssr: false,
});

const PageTransition = dynamic(() => import("./components/page-transition").then(mod => ({ default: mod.PageTransition })), {
  ssr: false,
});


export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://mohammedfirdous.me"),
  title: {
    default: "Mohammed Firdous",
    template: "%s | Mohammed Firdous",
  },
  description: "Cloud Engineer",
  openGraph: {
    title: "Mohammed Firdous",
    description:
      "Cloud Engineer",
    url: "https://mohammedfirdous.me",
    siteName: "Mohammed Firdous",
    images: [
      {
        url: "/favicon.png",
        width: 1920,
        height: 1080,
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
    description: "Cloud Engineer",
    images: "/favicon.png",
  },
  icons: {
    shortcut: "/favicon.png",
  },
};
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
      <head>
        <AnalyticsWrapper />
      </head>
      <body
        className={`bg-black ${process.env.NODE_ENV === "development" ? "" : undefined
          }`}
      >
        <SmoothScroll>
          <GrainOverlay />
          <ScrollProgress />
          <CustomCursor />
          <CommandPalette />
          <BackToTop />
          <PageTransition>
            {children}
          </PageTransition>
        </SmoothScroll>
      </body>
    </html>
  );
}