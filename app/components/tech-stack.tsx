"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Cloud, Code2, Terminal, Boxes } from "lucide-react";

interface TechItem {
  name: string;

interface TechItem {
  name: string;
  icon: string;
  color: string;
  category: "cloud" | "devops" | "languages" | "tools";
}

const techStack: TechItem[] = [
  // Cloud
  { name: "AWS", category: "cloud" },
  { name: "Azure", category: "cloud" },
  { name: "GCP", category: "cloud" },
  
  // DevOps
  { name: "Docker", category: "devops" },
  { name: "Kubernetes", category: "devops" },
  { name: "Terraform", category: "devops" },
  { name: "GitLab CI", category: "devops" },
  { name: "GitHub Actions", category: "devops" },
  
  // Languages
  { name: "Python", category: "languages" },
  { name: "TypeScript", category: "languages" },
  { name: "Go", category: "languages" },
  { name: "Bash", category: "languages" },
  
  // Tools
  { name: "Linux", category: "tools" },
  { name: "Git", category: "tools" },
  { name: "VS Code", category: "tools" },
  { name: "Next.js", category: "tools" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

export function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const categories = [
    { key: "cloud", label: "Cloud Platforms", icon: Cloud },
    { key: "devops", label: "DevOps & CI/CD", icon: Boxes },
    { key: "languages", label: "Languages", icon: Code2 },
    { key: "tools", label: "Tools & Frameworks", icon: Terminal },
  ];

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-zinc-950">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-emerald-500 opacity-20 blur-[100px]" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white font-display tracking-tight">
              Technical Arsenal
            </h2>
            <p className="mt-4 text-lg text-zinc-400 max-w-xl leading-relaxed">
              A curated stack of technologies I use to build robust, scalable, and efficient solutions.
            </p>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, x: 20 }}
             animate={isInView ? { opacity: 1, x: 0 } : {}}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="hidden md:block"
          >
             <div className="h-px w-24 bg-gradient-to-r from-zinc-500 to-transparent" />
          </motion.div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {categories.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + categoryIndex * 0.1 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 pb-4 border-b border-zinc-800/50">
                  <span className="p-2 rounded-lg bg-zinc-900/50 text-zinc-400 border border-zinc-800">
                    <Icon size={20} />
                  </span>
                  <h3 className="text-xl font-semibold text-zinc-200">
                    {category.label}
                  </h3>
                </div>
                
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                >
                  {techStack
                    .filter((tech) => tech.category === category.key)
                    .map((tech) => (
                      <motion.div
                        key={tech.name}
                        variants={itemVariants}
                        className="group flex items-center justify-center p-3 rounded-xl bg-zinc-900/30 border border-zinc-800/50 hover:bg-zinc-900/80 hover:border-zinc-700 transition-all duration-300"
                      >
                        <span className="text-sm font-medium text-zinc-300 group-hover:text-emerald-400 transition-colors text-center">
                          {tech.name}
                        </span>
                      </motion.div>
                    ))}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Compact inline version for other pages
export function TechStackInline({ limit = 8 }: { limit?: number }) {
  return (
    <div className="flex flex-wrap gap-2">
      {techStack.slice(0, limit).map((tech) => (
        <span
          key={tech.name}
          className="inline-flex items-center px-3 py-1 text-xs font-medium text-zinc-400 bg-zinc-900/50 border border-zinc-800 rounded-full hover:text-zinc-200 hover:border-zinc-700 transition-colors"
        >
          {tech.name}
        </span>
      ))}
    </div>
  );
}
