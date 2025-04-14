import EducationItemProps from "@/types/Education";
import { motion } from "framer-motion";



const EducationItem = ({ degree, institution, location, period, description }: EducationItemProps) => {
  return (
    <motion.div 
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <h3 className="font-inter text-lg font-semibold text-gray-900 dark:text-gray-100">{degree}</h3>
      <div className="flex justify-between items-center mt-1">
        <p className="font-poppins text-md font-medium text-green-500">{institution}, {location}</p>

      </div>
      <p className="font-poppins mt-2 text-gray-600 dark:text-gray-100">{description}</p>
      <p className="font-poppins text-sm text-gray-600 dark:text-gray-100">{period}</p>
    </motion.div>
  );
};

export default EducationItem;