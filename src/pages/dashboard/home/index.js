import { motion } from "framer-motion";
import { useState } from "react";
import { FaRegMoon, FaUserCircle } from "react-icons/fa";
import { ImSun } from "react-icons/im";
import useDarkMode from "../../../shared/hooks/useDarkMode";
import DishesListView from "./components/DishesListView";
import UnavailableItems from "./components/UnavailableItems";

function DashboardHome() {
  const [darkMode, setDarkMode] = useDarkMode();
  const [theme, setTheme] = useState(darkMode ? "dark" : "light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    setDarkMode(!darkMode);
  };
  return (
    <>
      <motion.main
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col flex-1 gap-6 p-4"
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
          <div className="flex items-center">
            {theme === "light" && (
              <motion.span
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ImSun
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={toggleTheme}
                  size="32"
                  className="mr-2 cursor-pointer top-navigation-icon text-primary"
                />
              </motion.span>
            )}
            {theme === "dark" && (
              <motion.span
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FaRegMoon
                  onClick={toggleTheme}
                  size="32"
                  className="mr-2 cursor-pointer top-navigation-icon text-primary"
                />
              </motion.span>
            )}
            <FaUserCircle
              size="36"
              className="cursor-pointer top-navigation-icon text-slate-500 dark:text-slate-300"
            />
          </div>
        </header>
        <hr className="border-gray-700 dark:border-gray-600" />
        <DishesListView />
      </motion.main>
      <motion.aside
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col gap-y-6 w-96"
      >
        <UnavailableItems />
      </motion.aside>
    </>
  );
}

export default DashboardHome;
