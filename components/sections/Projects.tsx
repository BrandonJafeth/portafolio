"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineGithub, AiOutlineLink } from "react-icons/ai";
import projectsData from "@/data/projects.json";
import { skillIcons } from "@/lib/skillIcons";

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <motion.section
      className="my-12 max-w-screen-xl mx-auto px-4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {projectsData.map((project, index) => {
          const isHovered = hoveredProject === project.id;
          const projectLink = project.link || project.repo;

          return (
            <motion.div
              key={project.id}
              className="border border-gray-200 dark:border-gray-700 rounded-2xl 
                         overflow-hidden bg-white dark:bg-[#232325] 
                         flex flex-col h-full 
                         shadow-md hover:shadow-xl 
                         transform hover:scale-[1.02] transition-transform duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
            >
              {/* Imagen de cabecera siempre clickeable, redirije a demo o a repo */}
              <a
                href={projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-full h-56 block overflow-hidden cursor-pointer"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <motion.div
                  className="absolute inset-0 w-full h-full"
                  initial={false}
                  animate={{
                    opacity: isHovered ? 0 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>

                <motion.div
                  className="absolute inset-0 w-full h-full"
                  initial={false}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={project.hoverImage}
                    alt={`${project.title} - hover`}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </a>

              {/* Contenido interior */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Título + iconos de links */}
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-inter text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {project.title}
                  </h2>
                  <div className="flex items-center gap-2">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Ver el proyecto ${project.title}`}
                        className="font-poppins text-sm
                                   text-white bg-green-600 
                                   hover:bg-green-500
                                   transition-colors px-2 py-1 
                                   rounded-full flex items-center gap-1"
                      >
                        <AiOutlineLink size={18} />
                        <span className="hidden sm:inline">Demo</span>
                      </a>
                    )}
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Repositorio GitHub para ${project.title}`}
                        className="font-poppins text-sm 
                                   text-white bg-gray-700
                                   hover:bg-gray-600
                                   transition-colors px-2 py-1 
                                   rounded-full flex items-center gap-1"
                      >
                        <AiOutlineGithub size={18} />
                        <span className="hidden sm:inline">Repo</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Descripción */}
                <p className="font-poppins text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {project.description}
                </p>

                {/* Tags (badges) */}
                <div className="mt-auto flex flex-wrap gap-2 pt-2">
                  {project.tags?.map((tag) => {
                    const Icon = skillIcons[tag.name];
                    return (
                      <a
                        key={tag.name}
                        href={tag.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-poppins text-xs bg-gray-100 dark:bg-gray-700 
                                   text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full
                                   flex items-center gap-1 hover:bg-gray-200
                                   dark:hover:bg-gray-600 transition-colors"
                      >
                        {Icon && <Icon className="w-4 h-4" />}
                        <span>{tag.name}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
