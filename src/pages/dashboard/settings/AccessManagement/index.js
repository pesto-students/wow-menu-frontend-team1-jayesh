import { motion } from "framer-motion";

export default function AccessManagement() {
  return (
    <motion.main
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col flex-1 gap-6 p-4 pl-28"
    >
      <header>
        <h1 className="text-3xl font-semibold leading-loose text-slate-800 dark:text-white">
          Access Management
        </h1>
      </header>
    </motion.main>
  );
}
