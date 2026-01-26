## About This Project

This portfolio website showcases projects with a clean, minimalist design featuring particle animations, project cards, and smooth transitions. The architecture follows modern best practices with TypeScript, server-side rendering, and content management through MDX files.

## Features

- **Modern Tech Stack**: Built with Next.js 13 App Router, TypeScript, and Tailwind CSS
- **Content Management**: MDX-powered content with Contentlayer supporting:
  - Projects
  - Blog posts
  - Open source contributions
  - Work experience
  - Diagrams
  - Changelog entries
- **Analytics**: Page view tracking with Redis-based analytics
- **Responsive Design**: Mobile-first responsive design with dark theme
- **Interactive Elements**: Particle animations and smooth transitions
- **Performance Optimized**: Server-side rendering and edge-ready deployment
- **Code Quality**: Rome formatter and linter for consistent code style

## Tech Stack

- **Framework**: [Next.js 13](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Content**: [Contentlayer](https://www.contentlayer.dev/) for MDX processing
- **Database**: [Upstash Redis](https://upstash.com/) for analytics
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Package Manager**: [Bun](https://bun.sh/)
- **Formatter/Linter**: [Rome](https://rome.tools/)
- **Deployment**: [Vercel](https://vercel.com/)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/)
- An Upstash Redis database (optional, for analytics)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mohammedfirdouss/portfolio.git
   cd portfolio
   ```

   bun install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Upstash Redis (optional - for analytics)
   UPSTASH_REDIS_REST_URL=your_redis_url
   UPSTASH_REDIS_REST_TOKEN=your_redis_token
   ```


## Tech Stack

- **Framework**: [Next.js 13](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Content**: [Contentlayer](https://www.contentlayer.dev/) for MDX processing
- **Database**: [Upstash Redis](https://upstash.com/) for analytics
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Package Manager**: [Bun](https://bun.sh/)
- **Formatter/Linter**: [Rome](https://rome.tools/)
- **Deployment**: [Vercel](https://vercel.com/)

4. **Run the development server**
   ```bash
   bun dev
   ```
   
   Alternatively, use the provided script:
   ```bash
   ./scripts/dev.sh
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the result.

### Building for Production

```bash
bun run build
bun start
```

### Code Formatting

Format and lint code using Rome:
```bash
bun run fmt
```

## 🙏 Attribution & Inspiration

This project was **inspired by and built upon the exceptional open-source work** of [**Andreas Thomas**](https://chronark.com) (chronark). 

---

<div align="center">
  <p>Built with ❤️ by the open-source community</p>
  <p>Original design and inspiration by <a href="https://chronark.com">Andreas Thomas</a></p>
</div>
