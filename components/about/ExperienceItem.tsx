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
      <h3 className="font-inter text-xl font-bold text-foreground/90">{position}</h3>
      <p className="font-poppins text-base font-semibold text-primary mt-1">{company}</p> {/* Green via text-primary */}
      
      {typeof description === 'string' && (description.includes('\n') || description.includes('•')) ? (
        <ul className="font-poppins mt-3 text-muted-foreground leading-relaxed list-disc ml-5 space-y-2">
          {description.split(/\r?\n/).map((line, idx) => {
            const trimmed = line.trim();
            if (!trimmed) return null;
            // remove leading bullet if present
            const content = trimmed.startsWith('•') ? trimmed.replace(/^•\s?/, '') : trimmed;
            return (
              <li key={idx} className="text-sm">
                {content}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="font-poppins mt-3 text-muted-foreground leading-relaxed">{description}</p>
      )}
      <p className="font-poppins text-xs font-medium text-muted-foreground/60 mt-1 uppercase tracking-wider">{period} • {location}</p>
      
      {/* Tecnologías utilizadas */}
      <div className="mt-4 flex flex-wrap gap-2">
        {technologies.map((tech) => {
          const Icon = skillIcons[tech.name] || skillIcons["Default"];
          return (
            <a 
              key={tech.name}
              href={tech.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary/50 border border-transparent hover:border-border rounded-full transition-colors group"
            >
              <Icon className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground" />
              <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground">{tech.name}</span>
            </a>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ExperienceItem;