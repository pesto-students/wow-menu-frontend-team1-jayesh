// style for different props
const classes = {
  base: "w-full rounded shadow-lg p-4",
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
