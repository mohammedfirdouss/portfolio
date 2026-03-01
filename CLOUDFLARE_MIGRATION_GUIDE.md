
   - **Zone apex** (`yourdomain.com`): usually A/AAAA or CNAME to your host; for Cloudflare Pages/Workers you’ll set this later.
   - **www** (and other subdomains): point where they should (e.g. same as apex or specific service).
   - **Email (MX, SPF, DKIM, DMARC)**: keep exactly as required by your email provider; set these records to **DNS only** (grey cloud) so mail isn’t proxied.


5. Complete the flow; Cloudflare will show **two nameservers** (e.g. `ada.ns.cloudflare.com`, `bob.ns.cloudflare.com`).

### 1.3 Update Nameservers at Your Registrar

1. Log in at the **registrar** where you bought the domain (GoDaddy, Namecheap, Gandi, etc.).  
   Don’t know who it is? Use [ICANN Lookup](https://lookup.icann.org/).
2. Find **DNS / Nameservers / Name servers** for the domain.
3. Replace the current nameservers with the **two Cloudflare nameservers** from step 1.2.
4. Save. Propagation often takes 24–48 hours (sometimes minutes).

### 1.4 After DNS Is Active

- In Cloudflare: **SSL/TLS** → set mode (e.g. **Full** or **Full (strict)** if your origin has a valid cert).
- Optionally **re-enable DNSSEC** in Cloudflare and add the DS record at your registrar (Cloudflare shows the DS value).

**References:**  
[Add a site](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/) · [Update nameservers](https://developers.cloudflare.com/dns/nameservers/update-nameservers/) · [Full setup](https://developers.cloudflare.com/dns/zone-setups/full-setup/)

---

## Part 2: CDN and DDoS Protection

Once your domain uses Cloudflare nameservers and traffic is **proxied** (orange cloud):

- **CDN**: Caching and edge delivery are handled automatically for HTTP(S).
- **DDoS protection**: Included; no extra setup for typical use.
- **WAF**: Available in dashboard under **Security** (more options on paid plans).

Ensure the DNS records that serve your website (A, AAAA, or CNAME) have **Proxy status** = **Proxied** (orange cloud) in the DNS table.

---

## Part 3: Hosting — Vercel to Cloudflare

You have two main options for a Next.js app:

| Option | Best for | Product |
|--------|----------|--------|
| **Full-stack Next.js** (SSR, API routes, server components) | This portfolio (Next 13 + Contentlayer) | **Workers** via OpenNext |
| **Static export only** | Fully static sites | **Pages** (Git or Direct Upload) |

Cloudflare recommends **Workers + OpenNext** for full-stack Next.js (not static-only Pages).

### 3.1 Next.js on Cloudflare Workers (Recommended for Full-Stack)

Uses the [OpenNext adapter for Cloudflare](https://opennext.js.org/cloudflare).

**Steps:**

1. **Install dependencies**
   ```bash
   bun add @opennextjs/cloudflare
   bun add -D wrangler
   ```

2. **OpenNext config** (project root) — create `open-next.config.ts`:
   ```ts
   import { defineCloudflareConfig } from "@opennextjs/cloudflare";
   export default defineCloudflareConfig();
   ```

3. **Wrangler config** — create `wrangler.jsonc` (or `wrangler.toml`):
   ```jsonc
   {
     "$schema": "./node_modules/wrangler/config-schema.json",
     "main": ".open-next/worker.js",
     "name": "portfolio",
     "compatibility_date": "2025-03-01",
     "compatibility_flags": ["nodejs_compat"],
     "assets": {
       "directory": ".open-next/assets",
       "binding": "ASSETS"
     }
   }
   ```
   Use a recent `compatibility_date` (e.g. today); keep `nodejs_compat` for Next.js.

4. **Scripts** in `package.json`:
   ```json
   "preview": "opennextjs-cloudflare build && opennextjs-cloudflare preview",
   "deploy": "opennextjs-cloudflare build && opennextjs-cloudflare deploy"
   ```

5. **Build and deploy**
   ```bash
   bun run deploy
   ```
   First time: `bunx wrangler login` if needed. The app will be at `https://portfolio.<account>.workers.dev` unless you add a custom domain.

6. **Custom domain**  
   In Cloudflare: **Workers & Pages** → your Worker → **Settings** → **Triggers** → **Add** custom domain (e.g. `yourdomain.com`, `www.yourdomain.com`). If the zone is on the same account, DNS is updated automatically.

**CI/CD:** Use the same `deploy` command in GitHub Actions (or Workers Builds). Set secrets in Cloudflare (e.g. **Workers & Pages** → **Settings** → **Variables**) and use `wrangler deploy` in CI with `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID`.

**References:**  
[Next.js on Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/) · [OpenNext for Cloudflare](https://opennext.js.org/cloudflare)

### 3.2 Static Next.js on Pages (Only If You Use Static Export)

Only if your app is **fully static** (e.g. `output: 'export'` in `next.config.js`):

1. **Workers & Pages** → **Create** → **Pages** → **Connect to Git** (GitHub/GitLab).
2. Pick repo and branch; set **Framework preset** to **Next.js (Static HTML Export)**.
3. Build command: `npx next build` (or `bun run build`); Build output directory: `out`.
4. Add custom domain under the project’s **Custom domains** (apex requires zone on Cloudflare; subdomain can use CNAME to `*.pages.dev`).

### 3.3 Moving Off Vercel

- Remove or repoint **Vercel project** custom domain so it no longer points at Vercel.
- In Cloudflare DNS, point your domain (and www) to the Worker or Pages custom hostname you configured.
- Replace Vercel env vars with Cloudflare **Workers/Pages** **Variables and Secrets**.
- Update any GitHub Actions (e.g. `.github/workflows/deploy.yml`) to run `bun run deploy` and use Cloudflare API token instead of Vercel.

---

## Part 4: Durable Objects and Other Cloudflare Services

### 4.1 Durable Objects (DOs)

- **What they are**: Stateful Workers with durable storage (e.g. SQLite) and a unique ID; good for real-time coordination, chat, games, sessions.
- **Important**: DOs are **not** hit directly by the internet; a **Worker** (or Pages Function) receives the request and forwards to a DO via a **binding**.

**Minimal setup:**

1. **Create a Worker** (or use your existing Next.js Worker and add a separate Worker that uses DOs and is routed by the same domain/path if needed).
2. **Define a Durable Object class** (e.g. in the same or linked Worker):
   ```ts
   import { DurableObject } from "cloudflare:workers";
   export class MyDurableObject extends DurableObject<Env> {
     constructor(ctx: DurableObjectState, env: Env) {
       super(ctx, env);
     }
     async fetch(request: Request) {
       // or expose RPC methods
       return new Response("Hello from DO");
     }
   }
   ```
3. **Wrangler**: bind the DO and (if using SQLite) add a migration:
   ```toml
   [[durable_objects.bindings]]
   name = "MY_DO"
   class_name = "MyDurableObject"

   [[migrations]]
   tag = "v1"
   new_sqlite_classes = ["MyDurableObject"]
   ```
4. In your Worker, get a stub and call the DO: `env.MY_DO.get(id)` then `stub.fetch(...)` or RPC.

**References:**  
[Durable Objects](https://developers.cloudflare.com/durable-objects/) · [Get started (DO)](https://developers.cloudflare.com/durable-objects/get-started/) · [SQLite storage](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/)

### 4.2 Other Services You Might Use

- **D1**: Serverless SQL DB; attach to Workers/Pages and query from Next.js API routes or Workers.
- **R2**: S3-compatible object storage; attach as a binding to Workers.
- **Workers AI**: Run AI models at the edge; call from a Worker or API route.
- **KV**: Key-value store; good for cache or simple state.

All of these are configured in **wrangler** (or dashboard) as **bindings** and are available on `env` in Workers and in Pages Functions.

---

## Checklist

- [ ] DNSSEC disabled at registrar (before nameserver change)
- [ ] Domain added to Cloudflare; DNS records reviewed (apex, www, email)
- [ ] Nameservers updated at registrar; propagation complete
- [ ] SSL/TLS mode set (e.g. Full/Full strict)
- [ ] Next.js app on Workers (OpenNext) or static on Pages
- [ ] Custom domain added to Worker/Pages and DNS points to Cloudflare
- [ ] Env vars moved to Cloudflare (Variables and Secrets)
- [ ] CI/CD updated (e.g. GitHub Actions → `wrangler deploy` or `bun run deploy`)
- [ ] Durable Objects / D1 / R2 etc. added in Wrangler and code if needed

---

## Quick Links

| Topic | URL |
|------|-----|
| Add site / DNS | https://developers.cloudflare.com/fundamentals/manage-domains/add-site/ |
| Update nameservers | https://developers.cloudflare.com/dns/nameservers/update-nameservers/ |
| Next.js on Workers | https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/ |
| OpenNext Cloudflare | https://opennext.js.org/cloudflare |
| Pages + Git | https://developers.cloudflare.com/pages/get-started/git-integration/ |
| Custom domains (Pages) | https://developers.cloudflare.com/pages/configuration/custom-domains/ |
| Durable Objects | https://developers.cloudflare.com/durable-objects/ |
| DO get started | https://developers.cloudflare.com/durable-objects/get-started/ |
| Wrangler config | https://developers.cloudflare.com/workers/wrangler/configuration/ |
