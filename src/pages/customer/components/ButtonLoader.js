import { motion } from "framer-motion";

function ButtonLoader({ className }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      className={`
      w-20 h-6 rounded-full bg-slate-300 dark:bg-slate-700
      ${className}`}
    />
  );
}

export default ButtonLoader;
