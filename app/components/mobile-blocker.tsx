"use client";

import { useState, useEffect } from "react";

export function MobileBlocker() {
	const [isMobile, setIsMobile] = useState(false);
	const [dismissed, setDismissed] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			const isSmallScreen = window.innerWidth < 768;
			setIsMobile(isSmallScreen);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	if (!isMobile || dismissed) return null;

	return (
		<div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 safe-bottom">
			<div className="max-w-sm mx-auto bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 rounded-2xl p-4 flex items-center gap-4 shadow-2xl">
				<div className="flex-1 min-w-0">
					<p className="text-sm font-medium text-zinc-200">Best on desktop</p>
					<p className="text-xs text-zinc-500 mt-0.5">
						Some interactions are optimized for larger screens.
					</p>
				</div>
				<button
					onClick={() => setDismissed(true)}
					className="flex-shrink-0 px-3 py-1.5 text-xs font-medium text-zinc-400 border border-zinc-700 rounded-lg hover:text-white hover:border-zinc-600 transition-colors"
				>
					Got it
				</button>
			</div>
		</div>
	);
}
