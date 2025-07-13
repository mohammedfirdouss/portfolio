import { allDocuments } from "contentlayer/generated";
import Link from "next/link";

export default function OpenSourcePage() {
  // Filter for open-source documents
  const openSourceDocs = allDocuments.filter(doc => doc._raw.sourceFilePath.startsWith("open-source/"));

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Open Source</h1>
      <ul className="space-y-4">
        {openSourceDocs.map(doc => (
          <li key={doc._id}>
            <Link href={"/open-source/" + (doc.slug || "")}
              className="text-lg font-semibold hover:underline">
              {doc.title}
            </Link>
            <p className="text-gray-500 dark:text-gray-400">{doc.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
