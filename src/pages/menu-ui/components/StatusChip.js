const classes = {
  base: "select-none rounded px-2 py-1",
  theme: {
    light: "bg-light-base3 border",
    dark: "bg-dark-base3 border",
  },
  status: {
    Pending: "border-2 border-accent-orange text-accent-orange",
    Rejected: "border-2 border-accent-red text-accent-red",
    Preparing: "border-2 border-accent-purple text-accent-purple",
    Completed: "border-2 border-accent-green text-accent-green",
  },
};

function StatusChip({ children, theme, status }) {
  return (
    <button
      type="button"
      disabled
      className={`${classes.base} ${classes.theme[theme]} ${classes.status[status]}`}
    >
      {children}
    </button>
  );
}

export default StatusChip;
