const classes = {
  base: "select-none rounded p-2 flex justify-center items-center text-xl shadow-glow active:shadow-sm",
  theme: {
    light: "bg-light-base3 border border-dark-text2 text-light-text1",
    dark: "bg-dark-base3 border border-light-text1 text-dark-text1",
    primary: "bg-primary/80 border border-primary text-dark-text1",
  },
};

function IconButton({ className, children, onClick, theme = "light" }) {
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
