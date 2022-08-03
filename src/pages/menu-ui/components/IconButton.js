const classes = {
  base: "select-none rounded p-2 flex justify-center items-center text-xl shadow-glow active:shadow-sm",
  theme: {
    normal:
      "border bg-light-base3 border-dark-text2 text-light-text1 dark:bg-dark-base3 dark:border-light-text1 dark:text-dark-text1",
    primary: "bg-primary/80 border border-primary text-dark-text1",
  },
};

function IconButton({ className, children, onClick, theme = "normal" }) {
  return (
    <button
      type="button"
      className={`${classes.base} ${classes.theme[theme]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default IconButton;
