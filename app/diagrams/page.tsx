import { allDiagrams } from "contentlayer/generated";
import { DiagramArticle } from "./article";

export default function DiagramsPage() {
  // Filter for published diagrams entries
  const diagramsEntries = allDiagrams.filter(entry => entry.published);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Diagrams</h1>
      <ul className="space-y-4">
        {diagramsEntries.map(entry => (
          <li key={entry._id}>
            <DiagramArticle entry={entry} views={0} />
          </li>
        ))}
      </ul>
    </div>
  );
}
