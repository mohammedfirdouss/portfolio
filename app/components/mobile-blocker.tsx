"use client";

import { useState, useEffect } from "react";

export function MobileBlocker() {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			const mobileRegex =
				/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
			const isTouchDevice = () => {
				return navigator.maxTouchPoints > 0;
			};

			const userAgent = navigator.userAgent;
			const isSmallScreen = window.innerWidth < 768;
			const isMobileDevice = mobileRegex.test(userAgent) || isTouchDevice();

			setIsMobile(isMobileDevice || isSmallScreen);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	if (!isMobile) return null;

	return (
		<div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center p-6">
			<div className="text-center max-w-md">
				<h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
					Desktop Only
				</h1>
				<p className="text-zinc-400 text-lg">
					This experience is crafted for desktop.
				</p>
			</div>
		</div>
	);
}
