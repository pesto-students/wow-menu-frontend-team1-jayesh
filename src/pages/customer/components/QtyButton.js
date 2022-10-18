import Swal from "sweetalert2";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../../../store/reducers/cartReducer";

const classes = {
  base: "select-none flex items-center justify-between w-full rounded justify-among shadow-glow active:shadow-sm",
  variant: {
    fill: "bg-primary",
    outline:
      "border-2 border-primary bg-light-base3 text-light-text1 dark:bg-dark-base3 dark:text-dark-text1 py-1.5",
  },
  buttonBase: "flex items-center justify-center p-2.5 grow",
};

function QtyButton({
  quantity,
  id,
  onInc,
  onDec,
  variant = "fill",
  className,
}) {
  const dispatch = useDispatch();
  const handleInc = () => {
    if (quantity >= 20) {
      Swal.fire({
        title: "Order Limit Exceeded?",
        text: "You can't place more than 20 plates of a Single Item in a Order. If you need to order more than 20 plates please place this order and order again",
        icon: "warning",
        confirmButtonColor: "#50D1AA",
        confirmButtonText: "Ok",
        width: 300,
      });
    } else {
      dispatch(increaseQuantity(id));
    }
  };
  const handleDec = () => {
    if (quantity === 1) dispatch(removeFromCart(id));
    else dispatch(decreaseQuantity(id));
  };
  return (
    <motion.div
      whileTap={{ scale: 0.96 }}
      className={`${classes.base} ${classes.variant[variant]}`}
    >
      <button
        type="button"
        className={`${classes.buttonBase} ${className}`}
        onClick={id ? handleDec : onDec}
      >
        <AiOutlineMinus size={16} />
      </button>
      <p className={`text-lg font-semibold ${className}`}>{quantity}</p>
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
