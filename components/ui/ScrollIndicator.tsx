"use client";

import { motion } from "framer-motion";

interface ScrollIndicatorProps {
  className?: string;
}

export function ScrollIndicator({ className = "" }: ScrollIndicatorProps) {
  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`relative flex items-center justify-center w-10 h-10 ${className}`}
      onClick={handleScroll}
    >
      <motion.div
        className="cursor-pointer z-10"
        initial={{ y: 0 }}
        animate={{ y: [0, 8, 0] }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      >
        <svg
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="text-muted-foreground w-8 h-8 opacity-70 hover:opacity-100 transition-opacity"
          strokeWidth="1.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
        </svg>
      </motion.div>
    </div>
  );
}
