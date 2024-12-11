import { Variants } from "framer-motion";

// Variantes para el sol
const sunVariants: Variants = {
  initial: { y: 0 },
  animate: {
    y: [0, -5, 0],
    transition: {
      repeat: Infinity,
      repeatType: "loop", // Valor compatible con la versión actual
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
      repeatType: "loop", // Cambia "loop" o "reverse" según lo necesites
      duration: 2
    }
  }
};

 const arrowVariants: Variants = {
    initial: { y: 0 },
    animate: {
      y: [0, 5, 0], // Sutil movimiento vertical simulando 'viento'
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 2
      }
    }
  };
  

export { sunVariants, moonVariants,arrowVariants };
