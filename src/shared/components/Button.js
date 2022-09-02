import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const classes = {
  base: "select-none items-center",
  size: {
    small: "inline-flex pl-1 pr-2 py-1 rounded",
    normal: "inline-flex px-4 py-2 rounded",
    block: "flex w-full px-4 py-1 text-lg rounded",
  },
  align: {
    packed: "justify-center",
    spaced: "justify-between",
  },
  variant: {
    fill: "bg-primary text-dark-text1 shadow-glow active:shadow-sm",
    outline:
      "border-2 border-primary text-primary bg-light-base3 text-light-text1 dark:bg-dark-base3 dark:text-dark-text1 shadow-glow active:shadow-sm",
  },
  disabled: "opacity-50 cursor-not-allowed",
};

function Button({
  children,
  className,
  disabled = false,
  align = "packed",
  variant = "fill",
  size = "normal",
  onClick,
  href = "",
}) {
  const navigate = useNavigate();
  const handleRoute = () => {
    navigate(href);
  };
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      type="button"
      disabled={disabled}
      className={`
      ${classes.base}
      ${classes.size[size]}
      ${size === "block" && classes.align[align]}
      ${classes.variant[variant]}
      ${disabled && classes.disabled}
      ${className}
      `}
      onClick={href === "" ? onClick : handleRoute}
    >
      {children}
    </motion.button>
  );
}

export default Button;
