import LanguageItemProps from "@/types/Language";
import { motion } from "framer-motion";

const LanguageItem = ({ language, proficiency }: LanguageItemProps) => {
  return (
    <motion.div 
      className="mb-4 flex justify-between items-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <h3 className="text-md font-medium text-gray-900 dark:text-gray-100">{language}</h3>
      <span className="px-3 py-1 text-sm bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 rounded-full">
        {proficiency}
      </span>
    </motion.div>
  );
};

export default LanguageItem;