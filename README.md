## About This Project

This portfolio website showcases projects with a clean, minimalist design featuring particle animations, project cards, and smooth transitions. Built with Next.js 15 and deployed on Cloudflare Workers for edge performance.

## Features

- **Modern Tech Stack**: Next.js 15 App Router, TypeScript, and Tailwind CSS
- **Content Management**: MDX-powered content with Contentlayer supporting:
  - Projects
  - Blog posts
  - Open source contributions
  - Work experience
  - Diagrams
- **Analytics**: Page view tracking with Cloudflare KV
- **Responsive Design**: Mobile-first responsive design with dark theme
- **Interactive Elements**: Particle animations and smooth transitions
- **Edge Deployment**: Deployed on Cloudflare Workers for global performance
- **Code Quality**: Rome formatter and linter for consistent code style

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Content**: [Contentlayer](https://www.contentlayer.dev/) for MDX processing
- **Analytics**: [Cloudflare KV](https://developers.cloudflare.com/kv/) for page view tracking
- **Icons**: [Lucide React](https://lucide.dev/)
- **Package Manager**: [Bun](https://bun.sh/) / [npm](https://www.npmjs.com/)
- **Formatter/Linter**: [Rome](https://rome.tools/)
- **Deployment**: [Cloudflare Workers](https://workers.cloudflare.com/) via [OpenNext](https://opennext.js.org/cloudflare)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) or [Node.js](https://nodejs.org/)
- [Cloudflare account](https://dash.cloudflare.com/sign-up) (for deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/mohammedfirdouss/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   # or
   bun install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   bun dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Deployment to Cloudflare Workers

1. **Create a Cloudflare KV namespace**
   ```bash
   bunx wrangler kv namespace create ANALYTICS
   ```
   Copy the namespace ID and update `wrangler.jsonc`

2. **Login to Cloudflare**
   ```bash
   bunx wrangler login
   ```

3. **Deploy**
   ```bash
   bun run deploy
   # or
   npm run deploy
   ```

4. **Add custom domain** (optional)
   - Go to Cloudflare Dashboard → Workers & Pages → portfolio
   - Settings → Triggers → Custom domains
   - Add your domain

### CI/CD with GitHub Actions

The project includes automatic deployment via GitHub Actions. Add these secrets to your repository:

- `CLOUDFLARE_API_TOKEN` - Create at https://dash.cloudflare.com/profile/api-tokens
- `CLOUDFLARE_ACCOUNT_ID` - Find in Workers & Pages dashboard

Every push to `master` will automatically deploy to Cloudflare Workers.

### Code Formatting

```bash
bun run fmt
```

## 🙏 Attribution & Inspiration

This project was **inspired by and built upon the exceptional open-source work** of [**Boris Tane**](https://boristane.com). 

---

<div align="center">
  <p>Built with ❤️ by the open-source community</p>
  <p>Original design and inspiration by <a href="https://boristane.com">Boris Tane</a></p>
</div>
