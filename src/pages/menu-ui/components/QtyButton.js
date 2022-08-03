import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const classes = {
  base: "select-none flex items-center justify-between w-full rounded justify-among",
  variant: {
    fill: "bg-primary ",
    outline: "border-2 border-primary py-1",
  },
  theme: {
    light: "bg-light-base3 text-light-text1",
    dark: "bg-dark-base3 text-dark-text1",
  },
  buttonBase:
    "flex items-center justify-center p-2 grow shadow-glow active:shadow-sm",
};
function QtyButton({
  qty,
  onInc,
  onDec,
  theme = "light",
  variant = "fill",
  className,
}) {
  return (
    <div
      className={`${classes.base} ${classes.variant[variant]} ${
        variant === "outline" ? classes.theme[theme] : ""
      }`}
    >
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
