// style for different props
const classes = {
  base: "select-none w-full rounded p-4 shadow-lg",
};

function Card({ children, className }) {
  return (
    <div
      className={`
        ${classes.base}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Card;
