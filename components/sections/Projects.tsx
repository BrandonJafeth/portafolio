"use client";

import { motion } from "framer-motion";
import projectsData from "@/data/projects.json";
import { useTranslations } from "@/hooks/useTranslations";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Project } from "@/types/project";

export default function Projects() {
  const { t, isLoading } = useTranslations();

  const getTranslatedProject = (project: Project) => ({
    ...project,
    description: isLoading 
      ? project.description 
      : t(`projects.project${project.id}.description`, project.description),
  });

  // Cofolios-like Grid: Dynamic, clean
  return (
    <section className="py-24 max-w-6xl mx-auto px-6" id="projects">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
        >
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
                Selected Work
            </h2>
        </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
        {projectsData.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProjectCard
              project={getTranslatedProject(project as Project)}
              t={{
                demo: isLoading ? "Demo" : t("projects.demo", "Demo"),
                repo: isLoading ? "Repo" : t("projects.repo", "Repo"),
              }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
