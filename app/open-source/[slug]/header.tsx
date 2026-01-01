import type { FC } from "react";

const OpenSourceHeader: FC<{ title: string; summary?: string }> = ({
	title,
	summary,
}) => (
	<header className="mb-8">
		<h1 className="text-4xl font-bold mb-2 text-zinc-100">{title}</h1>
		{summary && <p className="text-lg text-zinc-300">{summary}</p>}
	</header>
);

export default OpenSourceHeader;
