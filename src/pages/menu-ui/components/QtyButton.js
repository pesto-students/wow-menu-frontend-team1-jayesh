import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const classes = {
  base: "select-none flex items-center justify-between w-full rounded justify-among shadow-glow active:shadow-sm",
  variant: {
    fill: "bg-primary py-1",
    outline:
      "border-2 border-primary bg-light-base3 text-light-text1 dark:bg-dark-base3 dark:text-dark-text1 py-1.5",
  },
  buttonBase: "flex items-center justify-center p-2 grow",
};
function QtyButton({ qty, onInc, onDec, variant = "fill", className }) {
  return (
    <div className={`${classes.base} ${classes.variant[variant]}`}>
      <button
        type="button"
        className={`${classes.buttonBase} ${className}`}
        onClick={onDec}
      >
        <AiOutlineMinus size={16} />
      </button>
      <p className={`text-lg font-semibold ${className}`}>{qty}</p>
      <button
        type="button"
        className={`${classes.buttonBase}  ${className}`}
        onClick={onInc}
      >
        <AiOutlinePlus size={16} />
      </button>
    </div>
  );
}

export default QtyButton;
