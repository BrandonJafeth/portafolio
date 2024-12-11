"use client";

import { motion } from "framer-motion";
import { sunVariants, moonVariants } from "../animations/heroVariants";
import { useThemeToggle } from "@/hooks/useThemeToggle";
import aboutData from "@/data/about.json";
import Image from "next/image";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";

export default function Hero() {
  const { mounted, isDark, toggleTheme } = useThemeToggle();

  if (!mounted) return <div className="h-[80vh]"></div>; // Espacio fijo al cargar

  return (
    <section className="flex flex-col sm:flex-row items-center justify-center min-h-[80vh] p-4 gap-8 relative">
      {/* Contenedor con tamaño reservado */}
      <div className="flex items-center justify-center relative">
        <div className="relative w-[250px] h-[250px] sm:w-[400px] sm:h-[400px]">
          {/* Imagen con espacio fijo */}
          <Image
            src="/Main vector.png"
            alt="main"
            fill
            sizes="(max-width: 640px) 250px, 400px"
            className="object-cover select-none rounded-lg"
            priority
          />
        </div>

        {/* Tema Oscuro/Claro */}
        <motion.div
          className="absolute top-0 right-0 cursor-pointer"
          variants={isDark ? moonVariants : sunVariants}
          initial="initial"
          animate="animate"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {isDark ? (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="white" />
            </svg>
          ) : (
            <Image
              src="/sun-svgrepo-com.svg"
              alt="Sun Icon"
              width={40}
              height={40}
              className="select-none"
              priority
            />
          )}
        </motion.div>
      </div>

      {/* Texto */}
      <div className="text-center sm:text-left space-y-4 max-w-sm">
        <h1 className="text-3xl font-bold">Hi, I&#39;m Brandon {isDark ? "✨" : "🍃"}</h1>
        <p className="text-md text-foreground/80">{aboutData.introduction}</p>
      </div>

      {/* Flecha de Scroll */}
      <div className="absolute bottom-10 flex justify-center w-full z-10">
        <ScrollIndicator className="text-foreground/80 sm:bottom-4 bottom-6" />
      </div>
    </section>
  );
}
