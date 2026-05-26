"use client";

import { motion } from "framer-motion";
import projectsData from "@/data/projects.json";
import { useTranslations } from "@/hooks/useTranslations";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Project } from "@/types/project";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Projects() {
  const { t, isLoading } = useTranslations();

  const getTranslatedProject = (project: Project) => ({
    ...project,
    title: isLoading
      ? project.title
      : t(`projects.project${project.id}.title`, project.title),
    description: isLoading 
      ? project.description 
      : t(`projects.project${project.id}.description`, project.description),
  });

  return (
    <section className="relative py-24 sm:py-28 max-w-6xl mx-auto px-4 sm:px-6" id="projects">
      <div className="pointer-events-none absolute inset-x-4 top-10 -z-10 h-56 rounded-[2rem] bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.12),_transparent_42%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.16),_transparent_35%),linear-gradient(180deg,_rgba(15,23,42,0.18),_transparent_72%)] blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12 sm:mb-16 max-w-3xl"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-1 text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          {isLoading ? "Projects" : t("projects.eyebrow", "Selected Work")}
        </div>

        <h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight text-foreground">
          {t("projects.title")}
        </h2>

        <p className="mt-4 max-w-2xl text-sm sm:text-base leading-7 text-muted-foreground">
          {t(
            "projects.subtitle",
            "Una selección de proyectos recientes con foco en conversión, rendimiento y claridad visual."
          )}
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-8"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        {projectsData.slice().reverse().map((project) => (
          <motion.div
            key={project.id}
            variants={itemVariants}
            className="h-full"
          >
            <ProjectCard
              project={getTranslatedProject(project as Project)}
              t={{
                demo: isLoading ? "Demo" : t("projects.demo", "Demo"),
                repo: isLoading ? "Repo" : t("projects.repo", "Repo"),
                visit: isLoading ? "Visit Site" : t("projects.visit", "Visit Site"),
                liveExperience: isLoading
                  ? "Live experience"
                  : t("projects.liveExperience", "Live experience"),
                caseStudy: isLoading
                  ? "Portfolio case study"
                  : t("projects.caseStudy", "Portfolio case study"),
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
