import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../../../redux/reducers/cartReducer";

const classes = {
  base: "select-none flex items-center justify-between w-full rounded justify-among shadow-glow active:shadow-sm",
  variant: {
    fill: "bg-primary py-1",
    outline:
      "border-2 border-primary bg-light-base3 text-light-text1 dark:bg-dark-base3 dark:text-dark-text1 py-1.5",
  },
  buttonBase: "flex items-center justify-center p-2 grow",
};

function QtyButton({ qty, id, onInc, onDec, variant = "fill", className }) {
  const dispatch = useDispatch();
  const handleInc = () => {
    dispatch(increaseQuantity(id));
  };
  const handleDec = () => {
    if (qty === 1) dispatch(removeFromCart(id));
    else dispatch(decreaseQuantity(id));
  };
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      className={`${classes.base} ${classes.variant[variant]}`}
    >
      <button
        type="button"
        className={`${classes.buttonBase} ${className}`}
        onClick={id ? handleDec : onDec}
      >
        <AiOutlineMinus size={16} />
      </button>
      <p className={`text-lg font-semibold ${className}`}>{qty}</p>
      <button
        type="button"
        className={`${classes.buttonBase}  ${className}`}
        onClick={id ? handleInc : onInc}
      >
        <AiOutlinePlus size={16} />
      </button>
    </motion.div>
  );
}

export default QtyButton;
