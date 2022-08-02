const classes = {
  base: "rounded p-2.5 flex justify-center items-center text-xl",
  theme: {
    light: "bg-light-base3 border border-dark-text2 text-light-text1",
    dark: "bg-dark-base3 border border-light-text1 text-dark-text1",
    primary: "bg-primary/80 border border-primary text-dark-text1",
  },
};

function IconButton({ children, onClick, theme = "light" }) {
  return (
    <button
      type="button"
      className={`${classes.base} ${classes.theme[theme]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default IconButton;
