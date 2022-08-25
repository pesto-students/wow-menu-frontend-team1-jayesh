import { motion } from "framer-motion";

const classes = {
  base: "select-none z-10 rounded-full text-xl bg-primary text-dark-text1 shadow-lg active:shadow-sm",
  size: {
    large: "p-6",
    regular: "p-4",
  },
};

function FloatingButton({ children, size = "regular", onClick }) {
  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.3 }}
      type="button"
      className={` ${classes.base} ${classes.size[size]}`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}

export default FloatingButton;
