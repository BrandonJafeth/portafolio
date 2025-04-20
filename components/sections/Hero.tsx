"use client";

import { motion, AnimatePresence } from "framer-motion";
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
      className="flex flex-col sm:flex-row items-center justify-center min-h-screen p-4 gap-8 relative transition-all duration-500"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="flex items-center justify-center relative w-full sm:w-auto">
        <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] mx-auto">
          <Image
            src="/Main vector.png"
            alt="main"
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 400px"
            className="object-contain sm:object-cover select-none rounded-lg"
            priority
            quality={85}
            loading="eager"
            fetchPriority="high"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAECgIDTBI2PQAAAABJRU5ErkJggg=="
          />
        </div>

        <div
          className="absolute top-4 right-4 cursor-pointer z-10" 
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.div
                key="moon"
                variants={moonVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="w-8 h-8 sm:w-10 sm:h-10"
                >
                  <path
                    d="M21 12.79A9 9 0 1111.21 3 A7 7 0 0021 12.79z"
                    fill="#ffffff"
                    stroke="#ffffff"
                    strokeWidth="0.5"
                  />
                </svg>
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                variants={sunVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Image
                  src="/sun-svgrepo-com.svg"
                  alt="Sun Icon"
                  width={40}
                  height={40}
                  className="select-none w-8 h-8 sm:w-10 sm:h-10"
                  priority
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="text-center sm:text-left space-y-4 max-w-sm">
        <h1 className="font-inter text-3xl font-bold">
          {t('hero.greeting')} {isDark ? "✨" : "🍃"}
        </h1>
        <p className="font-poppins text-md text-foreground/80">{t('hero.introduction')}</p>
      </div>

      <div className="absolute bottom-20 md:bottom-16 lg:bottom-24 xl:bottom-32 flex justify-center w-full z-10">
        <ScrollIndicator className="text-foreground/80" />
      </div>
    </motion.section>
  );
}
