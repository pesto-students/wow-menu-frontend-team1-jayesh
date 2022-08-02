const classes = {
  base: "rounded-full p-4 text-xl",
};

function TextButton({ children, onClick, theme, active = false }) {
  return (
    <button
      type="button"
      className={`
    ${classes.base} 
    ${active ? classes.active : classes.theme[theme]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default TextButton;
