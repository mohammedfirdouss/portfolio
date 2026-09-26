## About This

A personal portfolio site: projects, blog, open source contributions, talks, and diagrams, written in MDX and rendered with Next.js.

The layout follows [seangoedecke.com](https://www.seangoedecke.com/): one narrow serif column, a heavy sans-serif name, `│`-separated link rows, and hairline rules between sections.

Dark mode follows the visitor's OS setting (`prefers-color-scheme`). There is no toggle and no JavaScript. Colours are CSS variables on `:root` in `global.css`, redefined for dark mode.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) App Router, static export
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) plus theme variables and article styles in `global.css`
- **Content**: [Contentlayer](https://www.contentlayer.dev/) for MDX
- **Package manager**: [Bun](https://bun.sh/)
- **Formatter/Linter**: [Rome](https://rome.tools/)
- **Deployment**: Cloudflare Pages and GitHub Pages, both from the same static export

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/)

### Local Development

```bash
git clone https://github.com/mohammedfirdouss/portfolio.git
cd portfolio
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

`dev` and `build` run on Webpack, not Turbopack (Next 16's new default).
This is because Contentlayer's `withContentlayer()` wrapper adds its own
webpack config, which Turbopack cannot build.

Stop `bun dev` before running `bun run build`. The dev server regenerates
`.contentlayer/` in development mode, and a production build that picks that
up fails to prerender.

### Formatting and Linting

```bash
bun run fmt    # format
bun run lint   # check
```

## Content

Everything lives in `content/` as MDX, one folder per section: `blog`, `projects`, `open-source`, `talks`, `diagrams` and `experience`. Fields are defined in `contentlayer.config.js`.

- **Featured**: add `featured: true` to a project or blog post to list it in the "featured" section at the top of the home page.
- **Project results**: `outcomes`, `roleHighlights` and `proofLinks` in a project's frontmatter render as "What changed", "What I worked on" and "Links".
- **Cross-posted writing**: a blog post with `url` and `source` links out to where the full article lives (Medium, dev.to, ...).
- **Discussions**: add `discussions:` (a list of `label` and `href`) to a blog post to link to threads about it, such as Hacker News or LinkedIn.
- **Newsletter**: the "subscribe" link in the header points to the RSS feed until `newsletterUrl` is set in `app/lib/site.ts`.

### Syncing projects from GitHub

```bash
bun run sync-github                # draft pages for new public repos
bun run sync-github --check-dates  # also report projects with stale dates
```

New repos get a draft page in `content/projects/` with `published: false`. Repos that aren't portfolio projects go in `IGNORED_REPOS` in `scripts/sync-github.ts`. Set `GITHUB_TOKEN` to avoid rate limits.

The `sync-github.yml` workflow runs this every Monday (or on demand) and opens a pull request with any new drafts. It needs **Allow GitHub Actions to create and approve pull requests** turned on in the repo's Actions settings.

## Deployment

The site is a static export (`next build` → `out/`) deployed to two targets:

- **Cloudflare Pages**: `bun run deploy` (runs `wrangler pages deploy`)
- **GitHub Pages**: built with `GITHUB_PAGES=true` so Next.js serves it from the `/portfolio` subpath

Both deploy automatically on push to `master` via GitHub Actions (`.github/workflows/deploy.yml` and `gh-pages.yml`). `ci.yml` runs the build on other branches and pull requests, and `preview.yml` deploys a preview for each pull request.

## Attribution

Layout inspired by [Sean Goedecke](https://www.seangoedecke.com/). Original design and inspiration by [Boris Tane](https://boristane.com).
