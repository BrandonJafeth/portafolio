"use client";

import { motion } from "framer-motion";
import { sunVariants, moonVariants } from "../animations/heroVariants";
import { useThemeToggle } from "@/hooks/useThemeToggle";
import aboutData from "@/data/about.json";
import Image from "next/image";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator"; // Asegúrate de la ruta correcta

export default function Hero() {
  const { mounted, isDark, toggleTheme } = useThemeToggle();

  if (!mounted) return null;

  return (
    <section className="flex flex-col sm:flex-row items-center justify-center min-h-[80vh] p-4 gap-8 relative">
      <div className="flex items-center justify-center relative">
        <div className="relative">
          <Image
            src="/Main vector.png"
            alt="main"
            width={300}
            height={200}
            className="object-cover"
            priority
          />

          <motion.div
            className="absolute top-0 right-0 cursor-pointer"
            variants={isDark ? moonVariants : sunVariants}
            initial="initial"
            animate="animate"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path 
                  d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" 
                  fill="white" 
                />
              </svg>
            ) : (
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="5" stroke="orange" strokeWidth="2"/>
                <line x1="12" y1="1" x2="12" y2="3" stroke="orange" strokeWidth="2"/>
                <line x1="12" y1="21" x2="12" y2="23" stroke="orange" strokeWidth="2"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="orange" strokeWidth="2"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="orange" strokeWidth="2"/>
                <line x1="1" y1="12" x2="3" y2="12" stroke="orange" strokeWidth="2"/>
                <line x1="21" y1="12" x2="23" y2="12" stroke="orange" strokeWidth="2"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="orange" strokeWidth="2"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="orange" strokeWidth="2"/>
              </svg>
            )}
          </motion.div>
        </div>
      </div>

      <div className="text-center sm:text-left space-y-4 max-w-sm">
        <h1 className="text-3xl font-bold">
          Hi, I&#39;m Brandon {isDark ? "✨" : "🍃"}
        </h1>
        <p className="text-md text-foreground/80">
          {aboutData.introduction}
        </p>
      </div>

      {/* Flecha indicando scroll hacia abajo */}
      <div className="absolute bottom-10 flex justify-center w-full">
        <ScrollIndicator className="text-foreground/80" />
      </div>
    </section>
  );
}
