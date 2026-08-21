import {
	allBlogs,
	allProjects,
	allOpenSources,
	allDiagrams,
	allTalks,
	allCertifications,
} from "contentlayer/generated";

export const dynamic = "force-static";

type SearchItem = {
	title: string;
	description: string;
	href: string;
	type: string;
	tags?: string[];
	external?: boolean;
};

export async function GET() {
	const items: SearchItem[] = [];

	for (const post of allBlogs) {
		if (post.draft) continue;
		const external = !!(post.url || post.externalUrl);
		items.push({
			title: post.title,
			description: post.description,
			href: post.url || post.externalUrl || `/blog/${post.slug}`,
			type: "blog",
			tags: post.tags,
			external,
		});
	}

	for (const project of allProjects) {
		if (!project.published) continue;
		items.push({
			title: project.title,
			description: project.description,
			href: `/projects/${project.slug}`,
			type: "project",
		});
	}

	for (const item of allOpenSources) {
		if (item.published === false) continue;
		items.push({
			title: item.title,
			description: item.summary ?? "",
			href: `/open-source/${item.slug}`,
			type: "open-source",
		});
	}

	for (const talk of allTalks) {
		if (talk.published === false) continue;
		items.push({
			title: talk.title,
			description: talk.summary ?? "",
			href: `/talks/${talk.slug}`,
			type: "talk",
		});
	}

	for (const diagram of allDiagrams) {
		if (diagram.published === false) continue;
		items.push({
			title: diagram.title,
			description: diagram.summary ?? "",
			href: `/diagrams/${diagram.slug}`,
			type: "diagram",
		});
	}

	for (const cert of allCertifications) {
		items.push({
			title: cert.title,
			description: cert.organization,
			href: cert.credentialUrl ?? "/certifications",
			type: "certification",
			external: !!cert.credentialUrl,
		});
	}

	return Response.json(items);
}
