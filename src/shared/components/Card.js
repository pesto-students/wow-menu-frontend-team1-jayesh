import { forwardRef } from "react";

// style for different props
const classes = {
  base: "select-none w-full rounded p-4 shadow-lg",
};

function Card({ children, className }, ref) {
  return (
    <div
      ref={ref}
      className={`
        ${classes.base}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default forwardRef(Card);
