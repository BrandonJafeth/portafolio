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
      <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 40 40">
        <path d="M20 5 v 30 M30 25 l -10 10 -10 -10" />
      </svg>
    </motion.div>
  );
}
