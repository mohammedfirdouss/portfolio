import { notFound } from "next/navigation";
import { allDocuments } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import "../mdx.css";
import { Navigation } from "@/app/components/nav"; // Added import

interface Props {
  params: { slug: string };
}

export default function DiagramsEntryPage({ params }: Props) {
  const doc = allDocuments.find(
    (doc) => doc._raw.sourceFilePath === `diagrams/${params.slug}.mdx`
  );
  if (!doc) notFound();
  return (
    <div className="relative pb-16"> {/* Added wrapper div */}
      <Navigation backLink="/diagrams" />
      <article className="prose dark:prose-invert mx-auto pt-20">
        <Mdx code={doc.body.code} />
      </article>
    </div>
  );
}
