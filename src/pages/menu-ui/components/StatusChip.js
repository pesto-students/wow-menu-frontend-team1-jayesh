const classes = {
  base: "select-none rounded px-2 py-1 border bg-light-base3 dark:bg-dark-base3",
  status: {
    Pending: "border-2 border-accent-orange text-accent-orange",
    Rejected: "border-2 border-accent-red text-accent-red",
    Preparing: "border-2 border-accent-purple text-accent-purple",
    Completed: "border-2 border-accent-green text-accent-green",
  },
};

function StatusChip({ children, status }) {
  return (
    <button
      type="button"
      disabled
      className={`${classes.base} ${classes.status[status]}`}
    >
      {children}
    </button>
  );
}

export default StatusChip;
