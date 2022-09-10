import { motion } from "framer-motion";

function ListLoader() {
  return (
    <motion.div className="w-full p-2 my-4 rounded-md shadow bg-light-base2 dark:bg-dark-base2">
      <div className="flex my-3 space-x-4 animate-pulse">
        <div className="flex-1 py-1 space-y-6">
          <div className="grid grid-cols-8 gap-8">
            <div className="h-2 col-span-2 rounded bg-slate-300 dark:bg-slate-700" />
            <div className="h-2 col-span-2 rounded bg-slate-300 dark:bg-slate-700" />
            <div className="h-2 col-span-2 rounded bg-slate-300 dark:bg-slate-700" />
            <div className="h-2 col-span-2 rounded bg-slate-300 dark:bg-slate-700" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ListLoader;
