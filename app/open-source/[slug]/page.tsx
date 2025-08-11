import { notFound } from "next/navigation";
import { allDocuments } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import "./mdx.css";
import { Navigation } from "@/app/components/nav"; // Added import

interface Props {
  params: { slug: string };
}

export default function OpenSourceEntryPage({ params }: Props) {
  const doc = allDocuments.find(
    (doc) => doc._raw.sourceFilePath === `open-source/${params.slug}.mdx`
  );
  if (!doc) notFound();
  return (
    <div className="bg-zinc-50 min-h-screen">
      <Navigation backLink="/open-source" /> {/* Added Navigation component */}
      {/* Add a header or view component here if needed, similar to projects */}
      <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless pt-20">
        <Mdx code={doc.body.code} />
      </article>
    </div>
  );
}
