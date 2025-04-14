import { motion } from "framer-motion";
import { skillIcons } from "@/lib/skillIcons";
import SkillCategoryProps from "@/types/Skill";


const SkillCategory = ({ category, technologies }: SkillCategoryProps) => {
  return (
    <motion.div 
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <h3 className="font-inter text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">{category}</h3>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => {
          const Icon = skillIcons[tech];
          return (
            <span 
              key={tech}
              className="flex items-center gap-1 px-3 py-2 bg-white dark:bg-gray-800 
                        shadow-sm rounded-lg border border-gray-200 dark:border-gray-700"
            >
              {Icon && <Icon className="w-4 h-4" />}
              <span>{tech}</span>
            </span>
          );
        })}
      </div>
    </motion.div>
  );
};

export default SkillCategory;