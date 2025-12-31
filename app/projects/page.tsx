import Link from "next/link";
import React from "react";
import Image from "next/image";
import { allProjects } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";
import { getRedis } from "@/util/redis";
import { Eye, Sparkles, ArrowRight } from "lucide-react";

export const revalidate = 60;
export default async function ProjectsPage() {
  console.log('All Projects:', allProjects);
  const featured = allProjects.find((project) => project._raw.sourceFileName === "Cruddur.mdx")!;
  const top2 = allProjects.find((project) => project._raw.sourceFileName === "TerraTowns.mdx")!;
  const top3 = allProjects.find((project) => project._raw.sourceFileName === "BloomRefresh.mdx")!;
  console.log({ featured, top2, top3 });
  const sorted = allProjects
    .filter((p) => p.published)
    .filter(
      (project) =>
        project.slug !== featured.slug &&
        project.slug !== top2.slug &&
        project.slug !== top3.slug,
    )
    .sort(
      (a, b) =>
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
    );

  const slugsToFetch = [
    featured.slug,
    top2.slug,
    top3.slug,
    ...sorted.map(p => p.slug)
  ];

  const redis = getRedis();
  let viewCounts: (number | null)[] = [];
  
  if (redis) {
    try {
      viewCounts = (await redis.mget(
        ...slugsToFetch.map((slug) => ["pageviews", "projects", slug].join(":"))
      )) as (number | null)[];
    } catch (e) {
      console.warn("Failed to fetch view counts:", e);
    }
  }

  const views: Record<string, number> = {};
  if (viewCounts) {
    allProjects.forEach((p, i) => {
      views[p.slug] = viewCounts[i] ?? 0;
    });
  }

  return (
    <div className="relative min-h-screen bg-black">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/30 via-black to-zinc-900/20" />
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />
      
      {/* Radial glow */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[600px] bg-gradient-radial from-zinc-800/20 via-transparent to-transparent rounded-full blur-3xl" />
      
      <Navigation />
      
      <div className="relative z-10 px-6 pt-24 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-32 lg:pt-40">
        {/* Header */}
        <div className="max-w-2xl mx-auto lg:mx-0">
          <div className="h-px w-16 bg-gradient-to-r from-zinc-500 to-transparent mb-8" />
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-zinc-500" />
            <span className="text-sm font-medium tracking-widest uppercase text-zinc-500">
              Portfolio
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl font-display">
            Projects
          </h1>
          <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
            Some of the projects are from work and some are on my own time. Each represents a journey of learning and problem-solving.
          </p>
        </div>
        
        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

        {/* Featured project */}
        <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2">
          <Card>
            <Link href={`/projects/${featured.slug}`} className="group block h-full">
              <article className="relative w-full h-full flex flex-col">
                {(featured.banner || featured.screenshot) && (
                  <div className="relative w-full h-48 sm:h-64 overflow-hidden rounded-t-2xl">
                     <Image
                        src={featured.banner || featured.screenshot || ""}
                        alt={featured.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
                  </div>
                )}
                
                <div className="p-6 md:p-10 flex flex-col flex-grow relative z-10 -mt-10">
                  {/* Featured badge */}
                  <div className="absolute top-0 right-6 md:right-10 -translate-y-[150%]">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-white border border-zinc-500/50 rounded-full bg-zinc-900/80 backdrop-blur-md shadow-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      Featured
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="text-xs text-zinc-400">
                      {featured.date ? (
                        <time dateTime={new Date(featured.date).toISOString()}>
                          {Intl.DateTimeFormat("en-US", {
                            dateStyle: "medium",
                          }).format(new Date(featured.date))}
                        </time>
                      ) : (
                        <span></span>
                      )}
                    </div>
                    <span className="flex items-center gap-1.5 text-xs text-zinc-400">
                      <Eye className="w-4 h-4" />{" "}
                      {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                        views[featured.slug] ?? 0,
                      )}
                    </span>
                  </div>

                  <h2
                    className="mt-2 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display transition-colors duration-300"
                  >
                    {featured.title}
                  </h2>
                  <p className="mt-4 leading-7 text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300 line-clamp-3">
                    {featured.description}
                  </p>
                  
                  <div className="mt-auto pt-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-400 group-hover:text-white transition-colors duration-300">
                    Read case study
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </article>
            </Link>
          </Card>

          <div className="flex flex-col w-full gap-6 mx-auto lg:mx-0">
            {[top2, top3].map((project) => (
              <Card key={project.slug}>
                <Article project={project} views={views[project.slug] ?? 0} />
              </Card>
            ))}
          </div>
        </div>
        
        {/* Divider */}
        <div className="hidden w-full h-px md:block bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

        {/* Other projects */}
        <div className="grid grid-cols-1 gap-6 mx-auto lg:mx-0 md:grid-cols-2 lg:grid-cols-3">
          {sorted.map((project) => (
            <Card key={project.slug}>
              <Article project={project} views={views[project.slug] ?? 0} />
            </Card>
          ))}
        </div>
      </div>
      
      {/* Bottom padding */}
      <div className="h-24" />
      
      {/* Corner decorations */}
      <div className="absolute top-24 left-8 w-24 h-24 border-l border-t border-zinc-800/50 rounded-tl-3xl" />
      <div className="absolute top-24 right-8 w-24 h-24 border-r border-t border-zinc-800/50 rounded-tr-3xl" />
    </div>
  );
}
