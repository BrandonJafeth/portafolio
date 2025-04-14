import { motion } from "framer-motion";
import { skillIcons } from "@/lib/skillIcons";
import ExperienceItemProps from "@/types/Experience";

const ExperienceItem = ({ 
  position, 
  company, 
  location, 
  period, 
  description,
  technologies
}: ExperienceItemProps) => {
  return (
    <motion.div 
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <h3 className="font-inter text-lg font-semibold text-gray-900 dark:text-gray-100">{position}</h3>
      <div className="flex justify-between items-center mt-1">
        <p className="font-poppins text-md font-medium text-green-500">{company}, {location}</p>
        <p className="font-poppins text-sm text-gray-600 dark:text-gray-200">{period}</p>
      </div>
      <p className="font-poppins mt-2 text-gray-600 dark:text-gray-200">{description}</p>
      
      {/* Tecnologías utilizadas */}
      <div className="mt-3 flex flex-wrap gap-2">
        {technologies.map((tech) => {
          const Icon = skillIcons[tech.name];
          return (
            <a 
              key={tech.name}
              href={tech.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full
                        hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {Icon && <Icon className="w-4 h-4" />}
              <span>{tech.name}</span>
            </a>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ExperienceItem;