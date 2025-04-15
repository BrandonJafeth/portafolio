"use client";

import { motion } from "framer-motion";
import { sunVariants, moonVariants } from "../animations/heroVariants";
import { useThemeToggle } from "@/hooks/useThemeToggle";
import { useTranslations } from "@/hooks/useTranslations";
import Image from "next/image";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";

export default function Hero() {
  const { mounted, isDark, toggleTheme } = useThemeToggle();
  const { t } = useTranslations();

  if (!mounted) return <div className="h-[80vh]"></div>;

  return (
    <motion.section
      className="flex flex-col sm:flex-row items-center justify-center min-h-screen p-4 gap-8 relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="flex items-center justify-center relative">
        <div className="relative w-[250px] h-[250px] sm:w-[400px] sm:h-[400px]">
          <Image
            src="/Main vector.png"
            alt="main"
            fill
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 400px"
            className="object-cover select-none rounded-lg"
            priority
            quality={85}
          />
        </div>

        <motion.div
          className="absolute top-0 right-0 cursor-pointer translate-x-2" 
          variants={isDark ? moonVariants : sunVariants}
          initial="initial"
          animate="animate"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {isDark ? (
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="sm:translate-x-7"
            >
              <path
                d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                fill="#ffffff80"
              />
            </svg>
          ) : (
            <Image
              src="/sun-svgrepo-com.svg"
              alt="Sun Icon"
              width={40}
              height={40}
              className="select-none sm:translate-x-7"
              priority
            />
          )}
        </motion.div>
      </div>

      <div className="text-center sm:text-left space-y-4 max-w-sm">
        <h1 className="font-inter text-3xl font-bold">
          {t('hero.greeting')} {isDark ? "✨" : "🍃"}
        </h1>
        <p className="font-poppins text-md text-foreground/80">{t('hero.introduction')}</p>
      </div>

      <div className="absolute bottom-10 flex justify-center w-full z-10">
        <ScrollIndicator className="text-foreground/80 sm:bottom-4 bottom-6" />
      </div>
    </motion.section>
  );
}
