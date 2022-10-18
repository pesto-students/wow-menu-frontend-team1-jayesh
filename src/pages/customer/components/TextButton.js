const classes = {
  base: "select-none px-2 pt-2 pb-1 mr-2 mb-1.5",
  active: "font-semibold text-primary border-b-primary border-b-2",
  inactive: "text-light-text1 dark:text-dark-text1",
};

function TextButton({ children, onClick, active = false }) {
  return (
    <button
      type="button"
      className={`
    ${classes.base} 
    ${active ? classes.active : classes.inactive}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default TextButton;
