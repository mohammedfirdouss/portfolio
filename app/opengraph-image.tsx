import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const dynamic = "force-static";
export const alt = "Mohammed Firdous";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
	const profileImg = readFileSync(
		join(process.cwd(), "public/profile prod.png"),
	);
	const profileSrc = `data:image/png;base64,${profileImg.toString("base64")}`;

	return new ImageResponse(
		(
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

					<div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column" }}>
						<div
							style={{
								fontSize: "56px",
								fontWeight: 700,
								color: "#111827",
								letterSpacing: "-2px",
								lineHeight: 1.1,
								marginBottom: "16px",
							}}
						>
							Mohammed Firdous
						</div>

						<div
							style={{
								fontSize: "26px",
								color: "#6b7280",
								fontWeight: 400,
								marginBottom: "40px",
								letterSpacing: "-0.3px",
							}}
						>
							Cloud Engineer
						</div>

						<div
							style={{
								display: "flex",
								gap: "12px",
								flexWrap: "wrap",
							}}
						>
							{["Kubernetes", "Open Source", "AI Systems"].map((tag) => (
								<div
									key={tag}
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
									{tag}
								</div>
							))}
						</div>

						<div
							style={{
								marginTop: "48px",
								fontSize: "18px",
								color: "#9ca3af",
							}}
						>
							mohammedfirdous.me
						</div>
					</div>
				</div>

				{/* Right: profile photo */}
				<img
					src={profileSrc}
					style={{
						width: "280px",
						height: "280px",
						borderRadius: "50%",
						objectFit: "cover",
						border: "4px solid #e5e7eb",
						flexShrink: 0,
					}}
				/>
			</div>
		),
		{ ...size },
	);
}
