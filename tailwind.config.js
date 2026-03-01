const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,css}",
		"./mdx-components.tsx",
		"content/**/*.mdx",
	],

	theme: {
		extend: {
			typography: {
				DEFAULT: {
					css: {
						"code::before": {
							content: '""',
						},
						"code::after": {
							content: '""',
						},
						a: {
							color: "#0284c7",
							borderBottom: "1px solid rgba(2, 132, 199, 0.3)",
							textDecoration: "none",
							"&:hover": {
								borderBottomColor: "#0284c7",
							},
						},
						blockquote: {
							borderLeftColor: "#3b82f6",
							fontStyle: "italic",
							color: "#4b5563",
						},
					},
				},
				quoteless: {
					css: {
						"blockquote p:first-of-type::before": { content: "none" },
						"blockquote p:first-of-type::after": { content: "none" },
					},
				},
			},
			fontFamily: {
				sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
				display: ["var(--font-calsans)"],
			},
		},
	},
	plugins: [
		require("@tailwindcss/typography"),
	],
};
