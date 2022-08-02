import { motion } from "framer-motion";

function DashboardOrders() {
  return (
    <motion.main
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col flex-1 gap-6 p-4"
    >
      <header>
        <h1 className="text-3xl font-semibold leading-loose text-slate-800 dark:text-white">
          Orders
        </h1>
        <div className="text-slate-700 dark:text-gray-500">
          {new Date().toDateString()}
        </div>
      </header>
      <hr className="border-gray-700 dark:border-gray-500" />
    </motion.main>
  );
}

export default DashboardOrders;
