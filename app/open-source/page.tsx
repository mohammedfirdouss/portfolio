import { allOpenSources } from "contentlayer/generated";
import { OpenSourceArticle } from "./article";

export default function OpenSourcePage() {
  // Filter for published open-source entries
  const openSourceEntries = allOpenSources?.filter((entry) => entry.published) || [];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Open Source</h1>
      <ul className="space-y-4">
        {openSourceEntries.map((entry) => (
          <li key={entry._id}>
            <OpenSourceArticle entry={entry} views={0} />
          </li>
        ))}
      </ul>
    </div>
  );
}
