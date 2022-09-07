import { motion } from "framer-motion";
import UserAndTheme from "../components/UserAndTheme";
import DishesListView from "./components/DishesListView";

function DashboardHome() {
  return (
    <motion.main
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col flex-1 gap-6 p-4 pl-28"
    >
      <header className="flex justify-between">
        <div>
          <h1 className="text-3xl font-semibold leading-loose ">
            <span className="text-primary">WOW </span>
            <span className="text-slate-800 dark:text-white">MENU</span>
          </h1>
          <div className="text-slate-700 dark:text-gray-300">
            {new Date().toDateString()}
          </div>
        </div>
        <UserAndTheme />
      </header>
      <hr className="border-gray-700 dark:border-gray-600" />
      <DishesListView />
    </motion.main>
  );
}

export default DashboardHome;
