"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface TechItem {
  name: string;
  icon: string;
  color: string;
  category: "cloud" | "devops" | "languages" | "tools";
}

const techStack: TechItem[] = [
  // Cloud
  { name: "AWS", icon: "☁️", color: "from-orange-500/20 to-orange-600/20", category: "cloud" },
  { name: "Azure", icon: "⚡", color: "from-blue-500/20 to-blue-600/20", category: "cloud" },
  { name: "GCP", icon: "🌐", color: "from-red-500/20 to-yellow-500/20", category: "cloud" },
  
  // DevOps
  { name: "Docker", icon: "🐳", color: "from-blue-400/20 to-cyan-500/20", category: "devops" },
  { name: "Kubernetes", icon: "⎈", color: "from-blue-500/20 to-indigo-500/20", category: "devops" },
  { name: "Terraform", icon: "🏗️", color: "from-purple-500/20 to-violet-500/20", category: "devops" },
  { name: "GitLab CI", icon: "🦊", color: "from-orange-400/20 to-red-500/20", category: "devops" },
  { name: "GitHub Actions", icon: "⚙️", color: "from-zinc-400/20 to-zinc-500/20", category: "devops" },
  
  // Languages
  { name: "Python", icon: "🐍", color: "from-yellow-500/20 to-blue-500/20", category: "languages" },
  { name: "TypeScript", icon: "📘", color: "from-blue-500/20 to-blue-600/20", category: "languages" },
  { name: "Go", icon: "🔵", color: "from-cyan-400/20 to-cyan-500/20", category: "languages" },
  { name: "Bash", icon: "💻", color: "from-green-500/20 to-green-600/20", category: "languages" },
  
  // Tools
  { name: "Linux", icon: "🐧", color: "from-yellow-500/20 to-zinc-500/20", category: "tools" },
  { name: "Git", icon: "📝", color: "from-orange-500/20 to-red-500/20", category: "tools" },
  { name: "VS Code", icon: "💙", color: "from-blue-400/20 to-blue-500/20", category: "tools" },
  { name: "Next.js", icon: "▲", color: "from-zinc-400/20 to-zinc-600/20", category: "tools" },
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
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

export function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const categories = [
    { key: "cloud", label: "Cloud Platforms" },
    { key: "devops", label: "DevOps & CI/CD" },
    { key: "languages", label: "Languages" },
    { key: "tools", label: "Tools & Frameworks" },
  ];

  return (
    <section ref={ref} className="relative py-24 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-900/50 to-transparent" />
      
      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-widest uppercase text-zinc-500 border border-zinc-800 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Tech Stack
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-display"
          >
            Technologies I Work With
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto"
          >
            Building scalable cloud infrastructure and modern applications with industry-leading tools
          </motion.p>
        </div>

        {/* Tech grid by category */}
        <div className="space-y-12">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category.key}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + categoryIndex * 0.1 }}
            >
              <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">
                {category.label}
              </h3>
              
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="flex flex-wrap gap-3"
              >
                {techStack
                  .filter((tech) => tech.category === category.key)
                  .map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className={`group relative flex items-center gap-2.5 px-4 py-2.5 bg-gradient-to-br ${tech.color} border border-zinc-800/50 rounded-xl cursor-default transition-all duration-300 hover:border-zinc-700`}
                    >
                      {/* Glow effect on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10`} />
                      
                      <span className="text-lg">{tech.icon}</span>
                      <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
                        {tech.name}
                      </span>
                    </motion.div>
                  ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 w-px h-32 bg-gradient-to-b from-transparent via-zinc-800 to-transparent -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-px h-32 bg-gradient-to-b from-transparent via-zinc-800 to-transparent -translate-y-1/2" />
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
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-400 bg-gradient-to-br ${tech.color} border border-zinc-800/50 rounded-lg`}
        >
          <span>{tech.icon}</span>
          {tech.name}
        </span>
      ))}
    </div>
  );
}
