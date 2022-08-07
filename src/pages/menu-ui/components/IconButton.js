import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const classes = {
  base: "select-none rounded p-2 flex justify-center items-center text-xl shadow-glow active:shadow-sm",
  theme: {
    normal:
      "border bg-light-base3 border-dark-text2 text-light-text1 dark:bg-dark-base3 dark:border-light-text1 dark:text-dark-text1",
    primary: "bg-primary/80 border border-primary text-dark-text1",
  },
};

function IconButton({
  className,
  children,
  onClick,
  href = "",
  theme = "normal",
}) {
  const navigate = useNavigate();
  const handleRoute = () => {
    navigate(href);
  };
  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      type="button"
      className={`${classes.base} ${classes.theme[theme]} ${className}`}
      onClick={href === "" ? onClick : handleRoute}
    >
      {children}
    </motion.button>
  );
}

export default IconButton;
