"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineGithub, AiOutlineLink } from "react-icons/ai";
import { Project } from "@/types/project";
import { skillIcons } from "@/lib/skillIcons";
import { useState } from "react";

interface ProjectCardProps {
  project: Project;
  t?: {
    demo?: string;
    repo?: string;
  };
}

export const ProjectCard = ({ project, t }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative flex flex-col gap-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual Preview - "Bento" style: clean, rounded, no border noise */}
      <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-muted/30 shadow-sm transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(34,197,89,0.15)] group-hover:scale-[1.01]">
        <Link href={project.link || project.repo || "#"} target="_blank" className="cursor-pointer block h-full w-full">
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center gap-4 backdrop-blur-[2px]">
                 {project.link && (
                    <span className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white font-medium text-sm border border-white/20 hover:bg-white/20 transition-colors">
                        <AiOutlineLink size={18} />
                        Visit
                    </span>
                 )}
            </div>
            <Image
                src={isHovered && project.hoverImage ? project.hoverImage : project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={false}
            />
        </Link>
      </div>

      {/* Content - Minimalist */}
      <div className="flex flex-col gap-2">
         <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors tracking-tight">
                {project.title}
            </h3>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                {project.repo && (
                    <a 
                        href={project.repo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                        title={t?.repo}
                    >
                        <AiOutlineGithub size={20} />
                    </a>
                )}
            </div>
         </div>

        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {/* Tags with Icons - Pill Style */}
        <div className="flex flex-wrap gap-2 mt-3">
            {project.tags?.map((tag) => {
                const Icon = skillIcons[tag.name] || skillIcons["Default"];
                
                const content = (
                    <>
                        <Icon className="w-3.5 h-3.5" />
                        <span>{tag.name}</span>
                    </>
                );

                const className = "flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground hover:border-border";

                if (tag.url) {
                    return (
                        <Link 
                            key={tag.name} 
                            href={tag.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${className} cursor-pointer`}
                        >
                            {content}
                        </Link>
                    );
                }

                return (
                    <div key={tag.name} className={className}>
                        {content}
                    </div>
                );
            })}
        </div>
      </div>
    </motion.article>
  );
};
