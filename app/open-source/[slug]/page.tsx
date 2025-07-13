import { notFound } from "next/navigation";
import { allDocuments } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import "../mdx.css";

interface Props {
  params: { slug: string };
}

export default function OpenSourceEntryPage({ params }: Props) {
  const doc = allDocuments.find(
    (doc) => doc._raw.sourceFilePath === `open-source/${params.slug}/index.mdx`
  );
  if (!doc) notFound();
  return (
    <article className="prose dark:prose-invert">
      <Mdx code={doc.body.code} />
    </article>
  );
}
