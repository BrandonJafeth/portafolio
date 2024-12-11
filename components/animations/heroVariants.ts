import { Variants } from "framer-motion";


const sunVariants: Variants = {
  initial: { y: 0 },
  animate: {
    y: [0, -5, 0],
    transition: {
      repeat: Infinity,
      repeatType: "loop", 
      duration: 2
    }
  }
};

// Variantes para la luna
const moonVariants: Variants = {
  initial: { y: 0 },
  animate: {
    y: [0, -5, 0],
    transition: {
      repeat: Infinity,
      repeatType: "loop", 
      duration: 2
    }
  }
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
  

export { sunVariants, moonVariants,arrowVariants };
