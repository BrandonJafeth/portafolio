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
      className={`relative flex items-center justify-center ${className}`}
      onClick={handleScroll}
    >
      <motion.div
        className="cursor-pointer z-10 absolute bottom-[20px] sm:bottom-[30px]"
        initial={{ y: 0 }}
        animate={{ y: [0, 10, 0] }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      >
        <svg
          width="40"
          height="40"
          fill="none"
          className="stroke-black dark:stroke-white"
          strokeWidth="2"
          viewBox="0 0 40 40"
        >
          <path d="M20 5 v 30 M30 25 l -10 10 -10 -10" />
        </svg>
      </motion.div>
    </div>
  );
}
