import { forwardRef } from "react";

// style for different props
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
      "border-2 border-primary text-primary shadow-glow active:shadow-sm",
  },
  theme: {
    light: "bg-light-base3 text-light-text1",
    dark: "bg-dark-base3 text-dark-text1",
  },
  disabled: "opacity-50 cursor-not-allowed",
};

const Button = forwardRef(
  (
    {
      children,
      className,
      disabled = false,
      theme = "light",
      align = "packed",
      variant = "fill",
      size = "normal",
      onClick,
    },
    ref,
  ) => (
    <button
      type="button"
      ref={ref}
      disabled={disabled}
      className={`
      ${classes.base}
      ${classes.size[size]}
      ${size === "block" && classes.align[align]}
      ${classes.variant[variant]}
      ${variant !== "fill" && classes.theme[theme]}
      ${disabled && classes.disabled}
      ${className}
      `}
      onClick={onClick}
    >
      {children}
    </button>
  ),
);

export default Button;
