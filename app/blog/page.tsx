import { allBlogs } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";
import { BookOpen, Sparkles } from "lucide-react";

export const revalidate = 60;
export default async function BlogPage() {
  const sorted = allBlogs.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  // Get featured/latest post
  const featured = sorted[0];
  const rest = sorted.slice(1);

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
      <div className="absolute top-0 right-1/4 w-[800px] h-[600px] bg-gradient-radial from-zinc-800/20 via-transparent to-transparent rounded-full blur-3xl" />
      
      <Navigation />
      
      <div className="relative z-10 px-6 pt-24 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-32 lg:pt-40">
        {/* Header */}
        <div className="max-w-2xl mx-auto lg:mx-0">
          <div className="h-px w-16 bg-gradient-to-r from-zinc-500 to-transparent mb-8" />
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-5 h-5 text-zinc-500" />
            <span className="text-sm font-medium tracking-widest uppercase text-zinc-500">
              Articles & Insights
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl font-display">
            Blog
          </h1>
          <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
            A space where I share what I'm learning about building software and working with the cloud. Thoughts on AWS, serverless, and the evolving tech landscape.
          </p>
        </div>
        
        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
        
        {/* Featured post */}
        {featured && (
          <div className="relative">
            <div className="absolute -top-4 left-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-zinc-400 border border-zinc-800 rounded-full bg-zinc-900/50">
                <Sparkles className="w-3 h-3" />
                Latest Post
              </span>
            </div>
            <Card>
              <Article project={featured} featured />
            </Card>
          </div>
        )}
        
        {/* Divider */}
        <div className="hidden w-full h-px md:block bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
        
        {/* Other posts */}
        <div className="grid grid-cols-1 gap-6 mx-auto lg:grid-cols-2 xl:grid-cols-3">
          {rest.map((project) => (
            <Card key={project.slug}>
              <Article project={project} />
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
