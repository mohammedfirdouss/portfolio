import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";
import { siteUrl } from "./site";

export const ogSize = { width: 1200, height: 630 };

const profileImg = readFileSync(join(process.cwd(), "public/profile prod.png"));
const profileSrc = `data:image/png;base64,${profileImg.toString("base64")}`;

/**
 * Renders a per-page Open Graph image in the same visual style as the root
 * `app/opengraph-image.tsx`: white background, faint watermark, sky-blue
 * accent chips, and the profile photo on the right.
 */
export function renderPageOgImage({
	title,
	kicker,
}: {
	/** The page title (blog post or project title). */
	title: string;
	/** Small label above the title, e.g. "Blog" or "Project". */
	kicker: string;
}) {
	// Long titles need a smaller font to stay inside the frame.
	const titleSize = title.length > 70 ? 44 : title.length > 40 ? 52 : 60;

	return new ImageResponse(
		<div
			style={{
				background: "#ffffff",
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems: "center",
				padding: "80px",
				fontFamily: "system-ui, sans-serif",
				gap: "64px",
			}}
		>
			{/* Left: text */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					flex: 1,
				}}
			>
				{/* Big faint watermark letter */}
				<div
					style={{
						fontSize: "200px",
						fontWeight: 700,
						color: "#f3f4f6",
						lineHeight: 1,
						position: "absolute",
						top: "20px",
						left: "60px",
						letterSpacing: "-8px",
						zIndex: 0,
					}}
				>
					hi!
				</div>

				<div
					style={{
						position: "relative",
						zIndex: 1,
						display: "flex",
						flexDirection: "column",
					}}
				>
					<div
						style={{
							display: "flex",
							marginBottom: "24px",
						}}
					>
						<div
							style={{
								background: "#f0f9ff",
								border: "1px solid #bae6fd",
								color: "#0284c7",
								fontSize: "18px",
								padding: "6px 16px",
								borderRadius: "6px",
								fontWeight: 500,
							}}
						>
							{kicker}
						</div>
					</div>

					<div
						style={{
							fontSize: `${titleSize}px`,
							fontWeight: 700,
							color: "#111827",
							letterSpacing: "-2px",
							lineHeight: 1.1,
							marginBottom: "24px",
						}}
					>
						{title}
					</div>

					<div
						style={{
							fontSize: "26px",
							color: "#6b7280",
							fontWeight: 400,
							letterSpacing: "-0.3px",
						}}
					>
						Mohammed Firdous
					</div>

					<div
						style={{
							marginTop: "40px",
							fontSize: "18px",
							color: "#9ca3af",
						}}
					>
						{siteUrl.replace(/^https?:\/\//, "")}
					</div>
				</div>
			</div>

			{/* Right: profile photo */}
			<img
				src={profileSrc}
				alt="Mohammed Firdous"
				style={{
					width: "280px",
					height: "280px",
					borderRadius: "50%",
					objectFit: "cover",
					border: "4px solid #e5e7eb",
					flexShrink: 0,
				}}
			/>
		</div>,
		{ ...ogSize },
	);
}
