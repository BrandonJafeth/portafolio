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
    liveExperience?: string;
    caseStudy?: string;
  };
}

export const ProjectCard = ({ project, t }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const displayImage = isHovered && project.hoverImage ? project.hoverImage : project.image;
  const hasLiveLink = Boolean(project.link);
  const hasRepo = Boolean(project.repo);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-border/60 bg-background/80 shadow-[0_20px_60px_-28px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_26px_70px_-24px_rgba(0,0,0,0.55)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full aspect-[16/11] overflow-hidden border-b border-border/60 bg-muted/40">
        <Link
          href={project.link || project.repo || "#"}
          target="_blank"
          className="block h-full w-full cursor-pointer relative"
          aria-label={`Open ${project.title}`}
        >
          <Image
            src={displayImage}
            alt={project.title}
            fill
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/18 to-transparent" />

          {hasLiveLink && (
            <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 py-2 text-xs font-medium text-white/95 shadow-lg backdrop-blur-md">
                <AiOutlineLink size={15} />
                {t?.visit || "Visit Site"}
              </span>

              <span className="hidden rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-white/80 backdrop-blur-md sm:inline-flex">
                Tap to open
              </span>
            </div>
          )}
        </Link>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/40 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Proyecto {project.id < 10 ? `0${project.id}` : project.id}
            </div>
            <h3 className="text-2xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
              {project.title}
            </h3>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {hasRepo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-background/80 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-border hover:text-foreground hover:shadow-md"
                title={t?.repo || "Repository"}
                aria-label={`${project.title} repository`}
              >
                <AiOutlineGithub size={20} />
              </a>
            )}

            {hasLiveLink && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/25 bg-primary text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20"
                title={t?.visit || "Visit Site"}
                aria-label={`Open live site for ${project.title}`}
              >
                <AiOutlineLink size={19} />
              </a>
            )}
          </div>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-2">
          {project.description}
        </p>

        <div className="mt-auto space-y-4">
          <div className="flex flex-wrap gap-2">
            {project.tags?.map((tag) => {
              const Icon = skillIcons[tag.name] || skillIcons.Default;

              const content = (
                <>
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tag.name}</span>
                </>
              );

              const className =
                "inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-secondary/55 px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-all hover:-translate-y-0.5 hover:border-border hover:bg-secondary";

              if (tag.url) {
                return (
                  <Link
                    key={tag.name}
                    href={tag.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
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

          <div className="flex items-center justify-between gap-3 border-t border-border/60 pt-4">
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
              {hasLiveLink
                ? t?.liveExperience || "Live experience"
                : t?.caseStudy || "Portfolio case study"}
            </p>

            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <span className="hidden sm:inline">Open</span>
              <span className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-background px-2.5 py-1 text-foreground">
                <AiOutlineLink size={14} />
                Live
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};
