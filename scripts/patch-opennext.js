#!/usr/bin/env node
/**
 * Patches @opennextjs/aws to handle missing pages-manifest.json (App Router only apps).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const helperPath = path.join(
	__dirname,
	"../node_modules/@opennextjs/aws/dist/build/helper.js",
);

const check = "if (!fs.existsSync(manifestPath))";
const toReplace =
	'const manifestPath = path.join(dotNextPath, ".next/server/pages-manifest.json");\n    const manifest = fs.readFileSync(manifestPath, "utf-8");';
const replacement = `const manifestPath = path.join(dotNextPath, ".next/server/pages-manifest.json");
    if (!fs.existsSync(manifestPath)) {
        return new Set();
    }
    const manifest = fs.readFileSync(manifestPath, "utf-8");`;

let content = fs.readFileSync(helperPath, "utf-8");
if (content.includes(check)) {
	console.log("OpenNext patch already applied.");
	process.exit(0);
}
if (!content.includes(toReplace)) {
	console.error("OpenNext patch target not found - package may have been updated.");
	process.exit(1);
}
content = content.replace(toReplace, replacement);
fs.writeFileSync(helperPath, content);
console.log("OpenNext patch applied successfully.");
