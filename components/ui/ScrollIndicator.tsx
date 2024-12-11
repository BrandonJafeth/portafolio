"use client";

import { motion } from "framer-motion";
import { arrowVariants } from "../animations/heroVariants";

interface ScrollIndicatorProps {
  className?: string;
}

export function ScrollIndicator({ className = "" }: ScrollIndicatorProps) {
  return (
    <motion.div
      className={`cursor-pointer ${className}`}
      variants={arrowVariants}
      initial="initial"
      animate="animate"
      aria-hidden="true"
    >
      {/* Flecha larga: línea vertical más extensa y cabeza de flecha al final */}
      <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 40 40">
        {/* 
          Línea vertical más larga:
          M20 5 v 30 => línea vertical desde y=5 hasta y=35 (largo)
          Cabeza de flecha:
          M30 25 l -10 10 -10 -10 => crea una flecha en la parte inferior
          Ajusta las coordenadas si quieres más largo aún.
        */}
        <path d="M20 5 v 30 M30 25 l -10 10 -10 -10" />
      </svg>
    </motion.div>
  );
}
