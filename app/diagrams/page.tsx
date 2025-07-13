import { allDocuments } from "contentlayer/generated";
import Link from "next/link";

export default function DiagramsPage() {
  // Filter for diagrams documents
  const diagramsDocs = allDocuments.filter(doc => doc._raw.sourceFilePath.startsWith("diagrams/"));

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Diagrams</h1>
      <ul className="space-y-4">
        {diagramsDocs.map(doc => (
          <li key={doc._id}>
            <Link href={"/diagrams/" + (doc.slug || "")}
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
