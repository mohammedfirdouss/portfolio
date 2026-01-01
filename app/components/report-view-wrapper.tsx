"use client";

import dynamic from "next/dynamic";

const ReportView = dynamic(
	() => import("../blog/[slug]/view").then((mod) => mod.ReportView),
	{
		ssr: false,
	},
);

export default ReportView;
