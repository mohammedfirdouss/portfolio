#!/usr/bin/env bun
/**
 * Syncs portfolio projects with GitHub repos.
 *
 * Usage:
 *   bun run sync-github              — find new repos, generate draft MDX files
 *   bun run sync-github --check-dates — also report projects with stale dates
 *
 * Set GITHUB_TOKEN env var to avoid rate limits (60 req/hr unauthenticated).
 */

import { readdir, readFile, writeFile } from "fs/promises";
import { join } from "path";

const GITHUB_USER = "mohammedfirdouss";
const PROJECTS_DIR = join(process.cwd(), "content/projects");
const CHECK_DATES = process.argv.includes("--check-dates");

interface GithubRepo {
	name: string;
	full_name: string;
	description: string | null;
	html_url: string;
	pushed_at: string;
	fork: boolean;
	archived: boolean;
	private: boolean;
}

async function fetchAllRepos(): Promise<GithubRepo[]> {
	const headers: Record<string, string> = {
		Accept: "application/vnd.github.v3+json",
		"User-Agent": "portfolio-sync-script",
	};
	if (process.env.GITHUB_TOKEN) {
		headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
	}

	const repos: GithubRepo[] = [];
	let page = 1;

	while (true) {
		const res = await fetch(
			`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&page=${page}&sort=pushed`,
			{ headers },
		);
		if (!res.ok) throw new Error(`GitHub API error: ${res.status} ${await res.text()}`);
		const data = (await res.json()) as GithubRepo[];
		if (data.length === 0) break;
		repos.push(...data);
		if (data.length < 100) break;
		page++;
	}

	return repos.filter((r) => !r.fork && !r.private && !r.archived);
}

async function getExistingRepos(): Promise<
	Map<string, { file: string; date: string; published: boolean }>
> {
	const files = await readdir(PROJECTS_DIR);
	const map = new Map<string, { file: string; date: string; published: boolean }>();

	for (const file of files) {
		if (!file.endsWith(".mdx")) continue;
		const content = await readFile(join(PROJECTS_DIR, file), "utf-8");
		const repo = content.match(/^repository:\s*(.+)$/m)?.[1]?.trim();
		const date = content.match(/^date:\s*"?([^"\n]+)"?/m)?.[1]?.trim() ?? "";
		const published = content.match(/^published:\s*(.+)$/m)?.[1]?.trim() !== "false";
		if (repo) map.set(repo, { file, date, published });
	}

	return map;
}

function toPascalCase(name: string): string {
	return name
		.split(/[-_.]/)
		.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
		.join("");
}

function yamlString(value: string): string {
	// Quote if contains colon, quote, or leading/trailing whitespace
	if (/[:\\"#]/.test(value) || value !== value.trim()) {
		return `"${value.replace(/"/g, '\\"')}"`;
	}
	return value;
}

function generateDraft(repo: GithubRepo): string {
	const date = repo.pushed_at.split("T")[0];
	const description = repo.description?.trim() || "TODO: add a description.";

	return `---
title: ${yamlString(repo.name)}
description: ${yamlString(description)}
date: "${date}"
repository: ${repo.full_name}
published: false
outcomes:
  - TODO
roleHighlights:
  - TODO
proofLinks:
  - label: Repository
    href: ${repo.html_url}
---

TODO: write a summary of this project.
`;
}

async function main() {
	console.log(`\nFetching repos for @${GITHUB_USER}...`);
	const repos = await fetchAllRepos();
	console.log(`  ${repos.length} public non-fork repos on GitHub`);

	const existing = await getExistingRepos();
	console.log(`  ${existing.size} projects in portfolio\n`);

	// ── New repos ──────────────────────────────────────────────────────────────
	const newRepos = repos.filter((r) => !existing.has(r.full_name));

	if (newRepos.length === 0) {
		console.log("✓ No new repos to add.");
	} else {
		console.log(`${newRepos.length} new repo(s) found:\n`);
		for (const repo of newRepos) {
			const filename = `${toPascalCase(repo.name)}.mdx`;
			await writeFile(join(PROJECTS_DIR, filename), generateDraft(repo));
			console.log(`  + content/projects/${filename}`);
			if (repo.description) console.log(`    "${repo.description}"`);
			console.log(`    pushed: ${repo.pushed_at.split("T")[0]}`);
		}
		console.log("\n  These are drafts (published: false). Edit and set published: true when ready.");
	}

	// ── Stale dates ────────────────────────────────────────────────────────────
	if (CHECK_DATES) {
		console.log("\nChecking for stale project dates...\n");
		let staleCount = 0;

		for (const repo of repos) {
			const entry = existing.get(repo.full_name);
			if (!entry || !entry.published) continue;

			const githubDate = repo.pushed_at.split("T")[0];
			if (entry.date && githubDate > entry.date) {
				console.log(`  ~ ${entry.file}`);
				console.log(`    portfolio: ${entry.date}`);
				console.log(`    github:    ${githubDate}`);
				staleCount++;
			}
		}

		if (staleCount === 0) {
			console.log("✓ All project dates are up to date.");
		} else {
			console.log(`\n  ${staleCount} project(s) with a newer GitHub push date.`);
			console.log("  Update the date: field in each file if the change is worth surfacing.");
		}
	} else {
		console.log("Tip: run with --check-dates to see projects with stale push dates.");
	}

	console.log();
}

main().catch((err) => {
	console.error(err.message);
	process.exit(1);
});
