import { allChangelogs } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";
import { ClipboardList } from "lucide-react";

export const revalidate = 60;

export default async function ChangelogPage() {
  const sorted = allChangelogs.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

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
      
      <Navigation />
      
      <div className="relative z-10 px-6 pt-24 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-32 lg:pt-40">
        {/* Header */}
        <div className="max-w-2xl mx-auto lg:mx-0">
          <div className="h-px w-16 bg-gradient-to-r from-zinc-500 to-transparent mb-8" />
          <div className="flex items-center gap-3 mb-4">
            <ClipboardList className="w-5 h-5 text-zinc-500" />
            <span className="text-sm font-medium tracking-widest uppercase text-zinc-500">
              Product Updates
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl font-display">
            Changelog
          </h1>
          <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
            Tracking the evolution of my projects. New features, improvements, and technical milestones.
          </p>
        </div>
        
        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
        
        {/* Changelog list */}
        <div className="grid grid-cols-1 gap-6 mx-auto lg:grid-cols-2 xl:grid-cols-3">
          {sorted.map((changelog) => (
            <Card key={changelog.slug}>
              <Article changelog={changelog} />
            </Card>
          ))}
        </div>
      </div>
      
      {/* Bottom padding */}
      <div className="h-24" />
    </div>
  );
}
