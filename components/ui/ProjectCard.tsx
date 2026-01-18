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
    visit?: string;
  };
}

export const ProjectCard = ({ project, t }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Use hover image if available and hovered, otherwise default image
  const displayImage = isHovered && project.hoverImage ? project.hoverImage : project.image;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative flex flex-col h-full bg-card rounded-2xl overflow-hidden border border-border/40 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual Preview - Reverted to Clean & Sharp */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-muted border-b border-border/40">
        <Link href={project.link || project.repo || "#"} target="_blank" className="cursor-pointer block h-full w-full relative">
            
            {/* Main Image Layer */}
            <Image
                src={displayImage}
                alt={project.title}
                fill
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Overlay Action with Translated Text */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center gap-4 backdrop-blur-[2px]">
                 {project.link && (
                    <span className="flex items-center gap-2 px-5 py-2.5 bg-background text-foreground rounded-full font-medium text-sm hover:scale-105 transition-transform shadow-lg border border-border">
                        <AiOutlineLink size={18} />
                        {t?.visit || "Visit Site"}
                    </span>
                 )}
            </div>
        </Link>
      </div>

      {/* Content - Clean & Structured */}
      <div className="flex flex-col gap-3 p-6 pt-4 flex-grow relative z-20 bg-card">
         <div className="flex justify-between items-start gap-4">
            <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors tracking-tight">
                {project.title}
            </h3>
            {project.repo && (
                <a 
                    href={project.repo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors p-1"
                    title={t?.repo}
                >
                    <AiOutlineGithub size={24} />
                </a>
            )}
         </div>

        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-2">
          {project.description}
        </p>

        {/* Tags with Icons - Pill Style */}
        <div className="mt-auto flex flex-wrap gap-2">
            {project.tags?.map((tag) => {
                const Icon = skillIcons[tag.name] || skillIcons["Default"];
                
                const content = (
                    <>
                        <Icon className="w-3.5 h-3.5" />
                        <span>{tag.name}</span>
                    </>
                );

                const className = "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary/50 text-secondary-foreground text-xs font-medium border border-border/50 hover:bg-secondary transition-colors";

                if (tag.url) {
                    return (
                        <Link 
                            key={tag.name} 
                            href={tag.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${className} cursor-pointer hover:border-border`}
                        >
                            {content}
                        </Link>
                    );
                }

                return (
                    <span key={tag.name} className={className}>
                        {content}
                    </span>
                );
            })}
        </div>
      </div>
    </motion.article>
  );
};
