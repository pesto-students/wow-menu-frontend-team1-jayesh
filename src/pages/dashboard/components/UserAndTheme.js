import { motion } from "framer-motion";
import { useState } from "react";
import { FaRegMoon, FaUserCircle } from "react-icons/fa";
import { ImSun } from "react-icons/im";
import { useSelector } from "react-redux";
import useDarkMode from "../../../shared/hooks/useDarkMode";

export default function UserAndTheme() {
  const user = useSelector((state) => state.auth.user);
  const [darkMode, setDarkMode] = useDarkMode();
  const [theme, setTheme] = useState(darkMode ? "dark" : "light");
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    setDarkMode(!darkMode);
  };

  return (
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
            className="mr-2 cursor-pointer text-primary"
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
            className="mr-2 cursor-pointer text-primary"
          />
        </motion.span>
      )}
      <div className="flex cursor-pointer">
        <span>
          <FaUserCircle
            size="36"
            className="text-slate-500 dark:text-slate-300"
          />
        </span>
        <span className="pt-[5px] pl-2">
          <p className="text-lg font-semibold select-none text-slate-500 dark:text-slate-300">
            {user.userDetails.firstname}
          </p>
        </span>
      </div>
    </div>
  );
}
