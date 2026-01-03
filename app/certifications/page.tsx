import React from "react";
import Link from "next/link";
import { allCertifications } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { BadgeCheck, Calendar, Building2, ExternalLink } from "lucide-react";

export default function CertificationsPage() {
  const certifications = allCertifications.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="relative min-h-screen bg-black">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/30 via-black to-zinc-900/20" />
      <div className="absolute inset-0 opacity-[0.02] bg-[url('/noise.png')] mix-blend-overlay" />
      
      <Navigation />

      <div className="relative z-10 px-6 pt-24 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-32 lg:pt-40">
        {/* Header */}
        <div className="max-w-2xl mx-auto lg:mx-0">
          <div className="h-px w-16 bg-gradient-to-r from-zinc-500 to-transparent mb-8" />
          <div className="flex items-center gap-3 mb-4">
            <BadgeCheck className="w-5 h-5 text-zinc-500" />
            <span className="text-sm font-medium tracking-widest uppercase text-zinc-500">
              Credentials
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl font-display">
            Certifications
          </h1>
          <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
            Professional certifications and credentials validation.
          </p>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

        <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2">
          {certifications.map((cert) => (
            <Card key={cert._id}>
              <div className="p-8 flex flex-col h-full">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-bold text-zinc-100 font-display">
                      {cert.title}
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                      <Building2 className="w-4 h-4" />
                      <span>{cert.organization}</span>
                    </div>
                  </div>
                  {cert.image && (
                    <div className="w-12 h-12 relative flex-shrink-0">
                      <img 
                        src={cert.image} 
                        alt={cert.organization} 
                        className="w-full h-full object-contain opacity-80"
                      />
                    </div>
                  )}
                </div>

                <div className="mt-6 flex flex-col gap-4 flex-grow">
                   {/* Description/Body */}
                   <div className="text-zinc-400 text-sm leading-relaxed prose prose-invert prose-sm max-w-none">
                     {/* We can render the MDX content here if needed, or just rely on frontmatter */}
                      {/* For now, simplistic rendering of body if it exists, or just title/org */}
                   </div>
                </div>

                <div className="mt-8 pt-6 border-t border-zinc-800/50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={cert.date}>
                      {new Date(cert.date).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                  </div>
                  
                  {cert.credentialUrl && (
                    <Link
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                      Verify
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="h-24" />
    </div>
  );
}
