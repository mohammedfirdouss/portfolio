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
			backgroundImage: {
				"gradient-radial":
					"radial-gradient(50% 50% at 50% 50%, var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
				"gradient-spotlight":
					"radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06), transparent 40%)",
			},
			colors: {
				zinc: {
					850: "#1f1f23",
					950: "#0c0c0f",
				},
			},
			animation: {
				"fade-in": "fade-in 3s ease-in-out forwards",
				"fade-in-fast": "fade-in 0.8s ease-out forwards",
				title: "title 3s ease-out forwards",
				"fade-left": "fade-left 3s ease-in-out forwards",
				"fade-right": "fade-right 3s ease-in-out forwards",
				"slide-up": "slide-up 0.8s ease-out forwards",
				"slide-down": "slide-down 0.5s ease-out forwards",
				"slide-in-right": "slide-in-right 0.5s ease-out forwards",
				"slide-in-left": "slide-in-left 0.5s ease-out forwards",
				"scale-in": "scale-in 0.5s ease-out forwards",
				"spin-slow": "spin 8s linear infinite",
				"pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
				"bounce-slow": "bounce 3s infinite",
				shimmer: "shimmer 2s linear infinite",
				glow: "glow 2s ease-in-out infinite alternate",
				float: "float 6s ease-in-out infinite",
				"gradient-x": "gradient-x 3s ease infinite",
				"gradient-y": "gradient-y 3s ease infinite",
				"gradient-xy": "gradient-xy 3s ease infinite",
			},
			keyframes: {
				"fade-in": {
					"0%": {
						opacity: "0%",
					},
					"75%": {
						opacity: "0%",
					},
					"100%": {
						opacity: "100%",
					},
				},
				"fade-left": {
					"0%": {
						transform: "translateX(100%)",
						opacity: "0%",
					},

					"30%": {
						transform: "translateX(0%)",
						opacity: "100%",
					},
					"100%": {
						opacity: "0%",
					},
				},
				"fade-right": {
					"0%": {
						transform: "translateX(-100%)",
						opacity: "0%",
					},

					"30%": {
						transform: "translateX(0%)",
						opacity: "100%",
					},
					"100%": {
						opacity: "0%",
					},
				},
				title: {
					"0%": {
						"line-height": "0%",
						"letter-spacing": "0.25em",
						opacity: "0",
					},
					"25%": {
						"line-height": "0%",
						opacity: "0%",
					},
					"80%": {
						opacity: "100%",
					},

					"100%": {
						"line-height": "100%",
						opacity: "100%",
					},
				},
				"slide-up": {
					"0%": {
						transform: "translateY(30px)",
						opacity: "0",
					},
					"100%": {
						transform: "translateY(0)",
						opacity: "1",
					},
				},
				"slide-down": {
					"0%": {
						transform: "translateY(-20px)",
						opacity: "0",
					},
					"100%": {
						transform: "translateY(0)",
						opacity: "1",
					},
				},
				"slide-in-right": {
					"0%": {
						transform: "translateX(30px)",
						opacity: "0",
					},
					"100%": {
						transform: "translateX(0)",
						opacity: "1",
					},
				},
				"slide-in-left": {
					"0%": {
						transform: "translateX(-30px)",
						opacity: "0",
					},
					"100%": {
						transform: "translateX(0)",
						opacity: "1",
					},
				},
				"scale-in": {
					"0%": {
						transform: "scale(0.9)",
						opacity: "0",
					},
					"100%": {
						transform: "scale(1)",
						opacity: "1",
					},
				},
				shimmer: {
					"0%": {
						backgroundPosition: "-200% 0",
					},
					"100%": {
						backgroundPosition: "200% 0",
					},
				},
				glow: {
					"0%": {
						boxShadow:
							"0 0 5px rgba(255,255,255,0.1), 0 0 10px rgba(255,255,255,0.05)",
					},
					"100%": {
						boxShadow:
							"0 0 20px rgba(255,255,255,0.2), 0 0 40px rgba(255,255,255,0.1)",
					},
				},
				float: {
					"0%, 100%": {
						transform: "translateY(0)",
					},
					"50%": {
						transform: "translateY(-10px)",
					},
				},
				"gradient-x": {
					"0%, 100%": {
						"background-size": "200% 200%",
						"background-position": "left center",
					},
					"50%": {
						"background-size": "200% 200%",
						"background-position": "right center",
					},
				},
				"gradient-y": {
					"0%, 100%": {
						"background-size": "200% 200%",
						"background-position": "center top",
					},
					"50%": {
						"background-size": "200% 200%",
						"background-position": "center bottom",
					},
				},
				"gradient-xy": {
					"0%, 100%": {
						"background-size": "400% 400%",
						"background-position": "left top",
					},
					"50%": {
						"background-size": "400% 400%",
						"background-position": "right bottom",
					},
				},
			},
			transitionTimingFunction: {
				"out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
				"in-expo": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
				"in-out-expo": "cubic-bezier(0.87, 0, 0.13, 1)",
			},
			boxShadow: {
				"glow-sm": "0 0 10px rgba(255,255,255,0.1)",
				"glow-md": "0 0 20px rgba(255,255,255,0.15)",
				"glow-lg": "0 0 30px rgba(255,255,255,0.2)",
				"inner-glow": "inset 0 0 20px rgba(255,255,255,0.05)",
			},
		},
	},
	plugins: [
		require("@tailwindcss/typography"),
		require("tailwindcss-debug-screens"),
	],
};
