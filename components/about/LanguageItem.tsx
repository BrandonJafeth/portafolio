import LanguageItemProps from "@/types/Language";
import { motion } from "framer-motion";
import { FaLanguage } from "react-icons/fa";

const LanguageItem = ({ language }: LanguageItemProps) => {
  return (
    <motion.div 
      className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 
                shadow-sm rounded-lg border border-gray-200 dark:border-gray-700
                hover:border-green-500 dark:hover:border-green-500 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
    >
      <FaLanguage className="w-5 h-5 text-blue-500" />
      <div className="flex-1">
        <h3 className="font-inter text-md font-medium text-gray-900 dark:text-gray-100">{language}</h3>
      </div>
 
    </motion.div>
  );
};

export default LanguageItem;