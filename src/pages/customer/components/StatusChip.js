const classes = {
  base: "select-none rounded px-2 py-1 bg-light-base3 dark:bg-dark-base3",
  status: {
    Pending: "text-accent-orange",
    Rejected: "text-accent-red",
    Preparing: "text-accent-violet",
    Completed: "text-accent-green",
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
