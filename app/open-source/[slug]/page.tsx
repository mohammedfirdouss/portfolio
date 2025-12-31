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
    <div className="bg-black min-h-screen">
      <Navigation backLink="/open-source" />
      <div className="relative">
        {/* Content Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 to-black" />
        
        <article className="relative z-10 px-6 py-20 mx-auto prose prose-invert prose-zinc prose-quoteless max-w-3xl pt-24">
          <Mdx code={doc.body.code} />
        </article>
      </div>
    </div>
  );
}
