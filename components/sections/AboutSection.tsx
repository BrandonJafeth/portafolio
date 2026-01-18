"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import aboutData from "@/data/about.json";
import { useThemeToggle } from "@/hooks/useThemeToggle";
import { useTranslations } from "@/hooks/useTranslations";
import { useEffect, useState } from "react";

import { skillIcons } from "@/lib/skillIcons";
import EducationItem from "../about/EducationItem";
import ExperienceItem from "../about/ExperienceItem";
import LanguageItem from "../about/LanguageItem";

const AboutSection = () => {
  const { mounted } = useThemeToggle();
  const { t } = useTranslations();
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey(prevKey => prevKey + 1);
  }, []);

  const PROFILE_IMAGE = "https://res.cloudinary.com/dkwvaxxdw/image/upload/v1768767250/_MG_1132_xdoxnx.jpg";

  if (!mounted) return <div className="min-h-screen" />;

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 lg:py-32" id="about">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* Left Column: Image (Sticky on Desktop) */}
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-5 lg:sticky lg:top-32"
            >
                <div className="relative">
                    {/* Main Image Container */}
                    <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-muted shadow-2xl z-10">
                        <Image
                            src={PROFILE_IMAGE}
                            alt={aboutData.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                    </div>
                </div>
            </motion.div>

            {/* Right Column: Content */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-7 space-y-16"
            >
                {/* Header */}
                <div className="space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                        {aboutData.name}
                    </h2>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground">
                         <span className="text-primary font-medium">{t('about.role')}</span>
                         <span className="hidden sm:inline w-1.5 h-1.5 rounded-full bg-border" />
                         <span>{t('about.location')}</span>
                    </div>
                    <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                        <p>{t('about.summary')}</p>
                        <p className="mt-4">{t('about.longDescription')}</p>
                    </div>
                </div>

                {/* Skills - Minimalist & Clean */}
                <div className="space-y-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/80 border-b border-border/40 pb-2">
                        {t('about.skills')}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {aboutData.skills.map((skill) => {
                             const Icon = skillIcons[skill.name] || skillIcons["Default"];
                             return (
                                <a 
                                    key={skill.name}
                                    href={skill.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-transparent hover:border-border transition-colors"
                                >
                                    <Icon className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                                    <span className="text-sm text-foreground/80 group-hover:text-foreground">{skill.name}</span>
                                </a>
                             )
                        })}
                    </div>
                </div>

                {/* Languages - Clean List */}
                <div className="space-y-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/80 border-b border-border/40 pb-2">
                        {t('about.languages')}
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {aboutData.languages.map((item, i) => (
                            <div key={i} className="flex flex-col p-3 rounded-lg hover:bg-muted/50 transition-colors">
                                <span className="font-medium text-foreground">{t(`languages.${item.language.toLowerCase()}.language`)}</span>
                                <span className="text-sm text-muted-foreground">{t(`languages.${item.language.toLowerCase()}.proficiency`)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Education - Minimal Timeline-like */}
                <div className="space-y-6">
                     <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/80 border-b border-border/40 pb-2">
                        {t('about.education')}
                    </h3>
                    <div className="space-y-8">
                        {aboutData.education.map((edu, i) => (
                            <div key={i} className="relative pl-6 border-l border-border/50">
                                <div className="absolute top-1.5 -left-1.5 w-3 h-3 rounded-full bg-secondary border border-border" />
                                <h4 className="font-semibold text-foreground">{edu.degree}</h4>
                                <p className="text-sm text-primary mt-1 mb-2">{edu.institution}</p>
                                <p className="text-sm text-muted-foreground leading-relaxed">{edu.description}</p>
                                <span className="text-xs text-muted-foreground/60 mt-2 block">{edu.period} • {edu.location}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Experience (If any) */}
                {aboutData.experience.length > 0 && (
                    <div className="space-y-6">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/80 border-b border-border/40 pb-2">
                            {t('about.experience')}
                        </h3>
                         <div className="space-y-8">
                             {aboutData.experience.map((exp, i) => (
                                 <ExperienceItem
                                    key={i}
                                    position={t(`experience.item${i + 1}.position`)}
                                    company={t(`experience.item${i + 1}.company`)}
                                    location={t(`experience.item${i + 1}.location`)}
                                    period={t(`experience.item${i + 1}.period`)}
                                    description={t(`experience.item${i + 1}.description`)}
                                    technologies={exp.technologies}
                                 />
                             ))}
                         </div>
                    </div>
                )}
            </motion.div>
        </div>
    </section>
  );
};

export default AboutSection;