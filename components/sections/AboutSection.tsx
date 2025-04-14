"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import aboutData from "@/data/about.json";
import { useThemeToggle } from "@/hooks/useThemeToggle";
import { useEffect, useState } from "react";

import { skillIcons } from "@/lib/skillIcons";
import EducationItem from "../about/EducationItem";
import ExperienceItem from "../about/ExperienceItem";

const AboutSection = () => {
  const { mounted } = useThemeToggle();
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey(prevKey => prevKey + 1);
  }, []);

  if (!mounted) return <div className="h-screen"></div>;

  return (
    <motion.section 
      className="max-w-4xl mx-auto px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      key={`section-${key}`}
    >
      {/* Cabecera - Información personal */}
      <motion.div 
        className="flex flex-col md:flex-row gap-8 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="w-full md:w-1/3 flex justify-center md:justify-start">
          <div className="relative w-64 h-64 overflow-hidden rounded-full border-2 border-green-500 ">
            <Image
              src={aboutData.image}
              alt={`${aboutData.name} profile picture`}
              fill
              className="rounded-full object-cover shadow-lg"
              priority
            />
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <h1 className="font-inter text-4xl font-bold text-gray-900  dark:text-white">
            {aboutData.name}
          </h1>
          <h2 className="font-inter text-lg text-green-500 dark:text-green-500 mt-2">
            {aboutData.role}
          </h2>
          <p className="font-poppins text-md text-gray-700 dark:text-white mt-4">
            {aboutData.introduction}
          </p>
          <p className="font-poppins text-md text-gray-600 dark:text-white mt-2">
            {aboutData.longDescription}
          </p>
          <p className="font-poppins text-sm text-gray-500  dark:text-gray-300 mt-4">
            {aboutData.location}
          </p>
        </div>
      </motion.div>

      {/* Sección de habilidades */}
      <motion.div 
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="font-inter text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
          Skills & Technologies
        </h2>
        <div className="flex flex-wrap gap-3">
          {aboutData.skills.map((skill, index) => {
            const Icon = skillIcons[skill.name];
            return (
              <motion.a
                key={index}
                href={skill.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 
                         shadow-sm rounded-lg border border-gray-200 dark:border-gray-700
                         hover:border-green-500 dark:hover:border-green-500 transition-colors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
              >
                {Icon && <Icon className="w-5 h-5" />}
                <span>{skill.name}</span>
              </motion.a>
            );
          })}
        </div>
      </motion.div>

      {/* Sección de Educación con título general */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="font-inter text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
          Education
        </h2>
        
        {/* Distribución de educación en dos columnas usando flex */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Primera columna de educación */}
          <div className="flex-1">
            {aboutData.education.length > 0 && (
              <EducationItem
                key={0}
                degree={aboutData.education[0].degree}
                institution={aboutData.education[0].institution}
                location={aboutData.education[0].location}
                period={aboutData.education[0].period}
                description={aboutData.education[0].description}
              />
            )}
          </div>
          
          {/* Segunda columna de educación */}
          <div className="flex-1">
            {aboutData.education.length > 1 && (
              <EducationItem
                key={1}
                degree={aboutData.education[1].degree}
                institution={aboutData.education[1].institution}
                location={aboutData.education[1].location}
                period={aboutData.education[1].period}
                description={aboutData.education[1].description}
              />
            )}
          </div>
        </div>
      </motion.div>

     

      {/* Segunda fila: Work Experience ocupando todo el ancho */}
      <motion.div 
        className="w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        key={`experience-${key}`}
      >
        <h2 className="font-inter text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
          Work Experience
        </h2>
        {aboutData.experience.map((item, index) => (
          <ExperienceItem
            key={index}
            position={item.position}
            company={item.company}
            location={item.location}
            period={item.period}
            description={item.description}
            technologies={item.technologies}
          />
        ))}
      </motion.div>
    </motion.section>
  );
};

export default AboutSection;