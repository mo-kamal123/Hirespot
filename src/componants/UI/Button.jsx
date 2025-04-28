import { motion } from "motion/react";


const Button = ({ children , ...props}) => {
  return (
    <motion.button {...props} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
      {children}
    </motion.button>
  );
};

export default Button;
