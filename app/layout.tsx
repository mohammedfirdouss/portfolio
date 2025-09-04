import "../global.css";
import { Inter } from "@next/font/google";
import LocalFont from "@next/font/local";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const AnalyticsWrapper = dynamic(() => import("./components/analytics-wrapper"), {
  ssr: false,
});


export const metadata: Metadata = {
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
        url: "/og.png",
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
    images: "/og.png",
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
        {children}
      </body>
    </html>
  );
}