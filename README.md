## About This

A personal portfolio site: projects, blog, open source contributions, talks, and diagrams, written in MDX and rendered with Next.js.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) App Router, static export
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Content**: [Contentlayer](https://www.contentlayer.dev/) for MDX
- **Icons**: [Lucide React](https://lucide.dev/)
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

### Formatting and Linting

```bash
bun run fmt    # format
bun run lint   # check
```

## Deployment

The site is a static export (`next build` → `out/`) deployed to two targets:

- **Cloudflare Pages**: `bun run deploy` (runs `wrangler pages deploy`)
- **GitHub Pages**: built with `GITHUB_PAGES=true` so Next.js serves it from the `/portfolio` subpath

Both deploy automatically on push to `master` via GitHub Actions (`.github/workflows/deploy.yml` and `gh-pages.yml`). `ci.yml` runs the build on other branches and pull requests.

## Attribution

Original design and inspiration by [Boris Tane](https://boristane.com).
