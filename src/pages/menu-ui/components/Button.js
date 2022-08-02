import { forwardRef } from "react";

// style for different props
const classes = {
  base: "select-none items-center active:outline-none transition ease-in-out duration-300",
  fab: "rounded-full p-4 text-xl",
  icon: "rounded w-16 h-12 flex justify-center items-center text-xl",
  size: {
    small: "inline-flex pl-1 pr-2 py-1 rounded",
    normal: "inline-flex px-4 py-2 rounded",
    block: "flex w-full px-4 py-1 text-lg rounded",
    // block: 'flex w-full px-8 py-3 text-lg rounded'
  },
  align: {
    packed: "justify-center",
    spaced: "justify-between",
  },
  variant: {
    fill: "bg-primary text-dark-text1 shadow-glow",
    outline: "border-2 border-primary text-primary shadow-glow",
    text: "bg-transparent",
    base: "border border-slate-500",
  },
  theme: {
    light: "bg-light-base3 text-light-text1",
    dark: "bg-dark-base3 text-dark-text1",
    primary: "text-primary",
  },
  active: "border-b-primary border-b-2",
  disabled: "opacity-50 cursor-not-allowed",
};

const Button = forwardRef(
  (
    {
      children,
      className,
      fab = false,
      icon = false,
      active = false,
      disabled = false,
      theme = "light",
      align = "packed",
      variant = "fill",
      size = "normal",
    },
    ref,
  ) => (
    <button
      type="button"
      ref={ref}
      disabled={disabled}
      className={`
      ${classes.base}
      ${fab && classes.fab}
      ${icon && classes.icon}
      ${!icon && !fab && variant !== "icon" && classes.size[size]}
      ${size === "block" && classes.align[align]}
      ${classes.variant[variant]}
      ${variant !== "fill" && classes.theme[theme]}
      ${active && classes.active}
      ${disabled && classes.disabled}
      ${className}
  `}
    >
      {children}
    </button>
  ),
);

export default Button;
