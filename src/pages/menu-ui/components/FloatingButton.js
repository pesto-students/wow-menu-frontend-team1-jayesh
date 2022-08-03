const classes = {
  base: "select-none z-10 rounded-full text-xl bg-primary text-dark-text1 shadow-primary shadow-md active:shadow-sm",
  size: {
    large: "p-6",
    regular: "p-4",
  },
};

function FloatingButton({ children, size = "regular", onClick }) {
  return (
    <button
      type="button"
      className={` ${classes.base} ${classes.size[size]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default FloatingButton;
