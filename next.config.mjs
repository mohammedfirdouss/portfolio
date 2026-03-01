import { withContentlayer } from "next-contentlayer";
import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "export",
	// Static export for Cloudflare Pages - avoids Contentlayer 500s on Workers
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
	experimental: {
		// mdxRs: true, // Disabled - causes app-page-turbo.runtime.prod.js ENOENT with OpenNext Cloudflare
	},
	compress: true,
	productionBrowserSourceMaps: false,
	poweredByHeader: false,
	images: {
		formats: ["image/webp", "image/avif"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
		],
	},
};

export default withContentlayer(bundleAnalyzer(nextConfig));
