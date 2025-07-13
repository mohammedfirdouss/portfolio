import type { FC } from "react";

const DiagramsHeader: FC<{ title: string; summary?: string }> = ({ title, summary }) => (
  <header className="mb-8">
    <h1 className="text-4xl font-bold mb-2">{title}</h1>
    {summary && <p className="text-lg text-gray-500 dark:text-gray-400">{summary}</p>}
  </header>
);

export default DiagramsHeader;
