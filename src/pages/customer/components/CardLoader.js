import { motion } from "framer-motion";

function CardLoader({ className }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      className={`
      shadow rounded-md p-4 max-w-sm w-full mx-auto bg-light-base3 dark:bg-dark-base1 my-5
        ${className}`}
    >
      <div className="flex my-3 space-x-4 animate-pulse">
        <div className="flex-1 py-1 space-y-6">
          <div className="h-2 rounded bg-slate-300 dark:bg-slate-700" />
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 col-span-2 rounded bg-slate-300 dark:bg-slate-700" />
              <div className="h-2 col-span-1 rounded bg-slate-300 dark:bg-slate-700" />
            </div>
            <div className="h-2 rounded bg-slate-300 dark:bg-slate-700" />
          </div>
        </div>
        <div className="w-20 h-20 rounded-full bg-slate-300 dark:bg-slate-700" />
      </div>
    </motion.div>
  );
}

export default CardLoader;
