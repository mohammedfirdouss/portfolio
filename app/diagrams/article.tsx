import Link from "next/link";
import { Eye } from "lucide-react";
import type { Diagram } from "contentlayer/generated";

interface Props {
  entry: Diagram;
  views: number;
}

export function DiagramArticle({ entry, views }: Props) {
  return (
    <Link href={`/diagrams/${entry.slug}`}>
      <article className="p-4 md:p-8">
        <div className="flex justify-between gap-2 items-center">
          <span className="text-xs text-zinc-200">
            {entry.date ? (
              <time dateTime={new Date(entry.date).toISOString()}>
                {Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
                  new Date(entry.date)
                )}
              </time>
            ) : (
              <span>SOON</span>
            )}
          </span>
          <span className="text-zinc-500 text-xs flex items-center gap-1">
            <Eye className="w-4 h-4" /> {Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
          </span>
        </div>
        <h2 className="text-xl font-medium lg:text-3xl text-zinc-200">
          {entry.title}
        </h2>
        <p className="mt-4 text-sm text-zinc-400">
          {entry.summary}
        </p>
      </article>
    </Link>
  );
}
