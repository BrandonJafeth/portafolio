import { Variants } from "framer-motion";

export const menuItemVariants: Variants = {
  hidden: { x: -20, opacity: 0 },
  visible: (index: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: index * 0.1, 
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

export const menuContainerVariants: Variants = {
  hidden: { 
    x: "100%",
    transition: {
      duration: 0.15,
      ease: "easeIn",
    }
  },
  visible: { 
    x: 0,
    transition: {
      duration: 0.15, 
      ease: "easeOut", 
    }
  },
  exit: { 
    x: "100%",
    transition: {
      duration: 0.15,
      ease: "easeIn",
    }
  },
};

export const iconVariants: Variants = {
  tap: { scale: 0.9 },
};
