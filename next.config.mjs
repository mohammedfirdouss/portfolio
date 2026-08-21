import { withContentlayer } from "next-contentlayer";
import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
});

// GitHub Pages serves this repo from /portfolio instead of the domain root.
const isGithubPages = process.env.GITHUB_PAGES === "true";

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
	basePath: isGithubPages ? "/portfolio" : undefined,
	assetPrefix: isGithubPages ? "/portfolio/" : undefined,
	env: {
		// Client components can't see `basePath` from next.config — expose it
		// explicitly for fetches to static files like /search-index.json.
		NEXT_PUBLIC_BASE_PATH: isGithubPages ? "/portfolio" : "",
	},
	images: {
		// Static export has no image optimization server on either host.
		unoptimized: true,
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
