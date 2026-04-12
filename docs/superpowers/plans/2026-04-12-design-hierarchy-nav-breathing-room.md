# Design Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply three targeted design improvements — homepage section hierarchy, nav active indicator, and detail page breathing room.

**Architecture:** All changes are purely presentational (Tailwind classes + JSX structure). No new components, no data changes, no contentlayer schema changes. Three files touched for detail pages, one for the nav, one for the homepage.

**Tech Stack:** Next.js 14, Tailwind CSS, TypeScript

---

## File Map

| File | Change |
|---|---|
| `app/page.tsx` | Section hierarchy — separators, View all links, tighter spacing |
| `app/components/nav.tsx` | Active link bottom border indicator |
| `app/projects/[slug]/page.tsx` | Breathing room between header and article |
| `app/open-source/[slug]/page.tsx` | Breathing room between header and article |
| `app/blog/[slug]/page.tsx` | Breathing room between header and article |

---

### Task 1: Nav active indicator

**Files:**
- Modify: `app/components/nav.tsx`

- [ ] **Step 1: Add bottom border to active nav link**

In `app/components/nav.tsx`, update the active link className from:
```tsx
className={`nav-link ${
  pathname?.startsWith(link.href)
    ? "text-sky-600"
    : "opacity-60 hover:opacity-100"
}`}
```
to:
```tsx
className={`nav-link pb-0.5 ${
  pathname?.startsWith(link.href)
    ? "text-sky-600 border-b-2 border-sky-500"
    : "opacity-60 hover:opacity-100 border-b-2 border-transparent"
}`}
```
The `border-transparent` on inactive links keeps the layout stable (no jump when switching pages).

- [ ] **Step 2: Commit**
```bash
git add app/components/nav.tsx
git commit -m "Add bottom border active indicator to nav links"
```

---

### Task 2: Homepage section hierarchy

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Add "View all" links and section separators**

Replace the four section divs in `app/page.tsx`. The blog section keeps its current `mt-16`. Projects, open source, and talks get a `border-t border-gray-100 pt-12 mt-12` instead of `mt-8` to create a clear visual zone boundary. Each section also gets a "View all →" link below its list.

Replace the blog section `<div className="mt-16">` block's closing area (after `</ul>`) with:
```tsx
<div className="mt-3">
  <Link href="/blog" className="text-sm text-sky-600 hover:underline">
    View all →
  </Link>
</div>
```

Replace `<div className="mt-8">` on the **projects** section with:
```tsx
<div className="border-t border-gray-100 pt-12 mt-12">
```
And add after its `</ul>`:
```tsx
<div className="mt-3">
  <Link href="/projects" className="text-sm text-sky-600 hover:underline">
    View all →
  </Link>
</div>
```

Replace `<div className="mt-8">` on the **open source** section with:
```tsx
<div className="border-t border-gray-100 pt-8 mt-8">
```
And add after its `</ul>`:
```tsx
<div className="mt-3">
  <Link href="/open-source" className="text-sm text-sky-600 hover:underline">
    View all →
  </Link>
</div>
```

Replace `<div className="mt-8">` on the **talks** section with:
```tsx
<div className="border-t border-gray-100 pt-8 mt-8">
```
And add after its `</ul>`:
```tsx
<div className="mt-3">
  <Link href="/talks" className="text-sm text-sky-600 hover:underline">
    View all →
  </Link>
</div>
```

- [ ] **Step 2: Commit**
```bash
git add app/page.tsx
git commit -m "Add section separators and View all links to homepage"
```

---

### Task 3: Detail page breathing room

**Files:**
- Modify: `app/projects/[slug]/page.tsx`
- Modify: `app/open-source/[slug]/page.tsx`
- Modify: `app/blog/[slug]/page.tsx`

- [ ] **Step 1: Projects detail page — increase gap before article**

In `app/projects/[slug]/page.tsx`, change:
```tsx
<div className="mb-8">
```
to:
```tsx
<div className="mb-12">
```
And change:
```tsx
<article className="prose max-w-none">
```
to:
```tsx
<article className="prose max-w-none prose-headings:mt-8 prose-headings:mb-3">
```

- [ ] **Step 2: Open source detail page — same treatment**

In `app/open-source/[slug]/page.tsx`, change:
```tsx
<div className="mb-8">
```
to:
```tsx
<div className="mb-12">
```
And change:
```tsx
<article className="prose max-w-none">
```
to:
```tsx
<article className="prose max-w-none prose-headings:mt-8 prose-headings:mb-3">
```

- [ ] **Step 3: Blog detail page — same treatment**

In `app/blog/[slug]/page.tsx`, change:
```tsx
<div className="mb-8">
```
to:
```tsx
<div className="mb-12">
```
And change:
```tsx
<article className="prose max-w-none">
```
to:
```tsx
<article className="prose max-w-none prose-headings:mt-8 prose-headings:mb-3">
```

- [ ] **Step 4: Commit**
```bash
git add app/projects/[slug]/page.tsx app/open-source/[slug]/page.tsx app/blog/[slug]/page.tsx
git commit -m "Increase breathing room on detail pages"
```
