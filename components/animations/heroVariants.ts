import { Variants } from "framer-motion";

// Variantes para el modo sol con transición
const sunVariants: Variants = {
  initial: { y: 0, opacity: 0, scale: 0.8, rotate: -45 },
  animate: {
    y: [0, -5, 0],
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      y: {
        repeat: Infinity,
        repeatType: "loop", 
        duration: 2
      },
      opacity: { duration: 0.7 },
      scale: { duration: 0.7 },
      rotate: { duration: 0.7 }
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    rotate: 45,
    transition: { duration: 0.7 }
  }
};

// Variantes para el modo luna con transición 
const moonVariants: Variants = {
  initial: { y: 0, opacity: 0, scale: 0.8, rotate: 45 },
  animate: {
    y: [0, -5, 0],
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      y: {
        repeat: Infinity,
        repeatType: "loop", 
        duration: 2
      },
      opacity: { duration: 0.7 },
      scale: { duration: 0.7 },
      rotate: { duration: 0.7 }
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    rotate: -45,
    transition: { duration: 0.7 }
  }
};

// Variantes para la transición del contenedor del tema
const themeContainerVariants: Variants = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

const arrowVariants: Variants = {
  initial: { y: 0 },
  animate: {
    y: [0, 5, 0],
    transition: {
      repeat: Infinity,
      repeatType: "loop",
      duration: 2
    }
  }
};

export { sunVariants, moonVariants, arrowVariants, themeContainerVariants };
