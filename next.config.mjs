import { withContentlayer } from "next-contentlayer";
import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
	experimental: {
		mdxRs: true,
	},
	// Performance optimizations
	compress: true,
	swcMinify: true,
	optimizeFonts: true,
	productionBrowserSourceMaps: false,
	poweredByHeader: false,
	// Image optimization
	images: {
		formats: ["image/webp", "image/avif"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
		],
	},
	// Cache optimization for development
	onDemandEntries: {
		maxInactiveAge: 60 * 1000,
		pagesBufferLength: 5,
	},
};

export default withContentlayer(bundleAnalyzer(nextConfig));
