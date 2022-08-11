import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BiRupee } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import Card from "../components/Card";
import Button from "../components/Button";
import { resetCart } from "../../../redux/reducers/cartReducer";
import { placeOrder } from "../../../redux/reducers/orderReducer";

// style for different props
const classes = {
  base: "absolute inset-x-0 bottom-0 pt-10 pb-20 shadow-lg bg-light-base3 dark:bg-dark-base3",
  amt: "text-light-text1 dark:text-dark-text1 text-lg",
};

function PlaceOrderCard({ className }) {
  const cart = useSelector((state) => state.cart);
  const restaurant = useSelector((state) => state.restaurant.details);
  const subtotal = parseFloat(
    cart.items.reduce(
      (sum, current) => sum + current.quantity * current.price,
      0,
    ),
  ).toFixed(2);
  const cgst = parseFloat(
    (useSelector((state) => state.restaurant.cgst) * subtotal) / 100,
  ).toFixed(2);
  const sgst = parseFloat(
    (useSelector((state) => state.restaurant.sgst) * subtotal) / 100,
  ).toFixed(2);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOrderPlacement = () => {
    const payload = {
      items: cart.items.map(({ id, quantity }) => {
        return { itemId: id, quantity };
      }),
      instruction: cart.instruction || "",
      restaurantId: restaurant.id,
      tableNo: restaurant.tableNo,
    };
    dispatch(placeOrder(payload));
    dispatch(resetCart());
    navigate("/home");
    Swal.fire({
      title: "Sweet!!",
      icon: "success",
      showConfirmButton: false,
      width: 300,
      timer: 1200,
      backdrop: `
    rgba(37,40,54,0.8)
    url("./images/confetti.gif")
    center bottom
    no-repeat
  `,
    });
  };

  return (
    <motion.div
      initial={{ y: 150, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 150, opacity: 0 }}
    >
      <Card
        className={`
      ${classes.base}
      ${className}
  `}
      >
        <div>
          <div className="flex justify-between">
            <p className={`${classes.amt}`}>Subtotal</p>
            <div className="flex items-center">
              <BiRupee className={`${classes.amt}`} />
              <p className={`${classes.amt}`}>
                {parseFloat(subtotal).toFixed(2)}
              </p>
            </div>
          </div>
          <div className="flex justify-between">
            <p className={`${classes.amt}`}>CGST</p>
            <div className="flex items-center">
              <BiRupee className={`${classes.amt}`} />
              <p className={`${classes.amt}`}>{parseFloat(cgst).toFixed(2)}</p>
            </div>
          </div>
          <div className="flex justify-between">
            <p className={`${classes.amt}`}>SGST</p>
            <div className="flex items-center">
              <BiRupee className={`${classes.amt}`} />
              <p className={`${classes.amt}`}>{parseFloat(sgst).toFixed(2)}</p>
            </div>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between mb-2">
            <p className={`${classes.amt}`}>Total</p>
            <div className="flex items-center">
              <BiRupee className={`${classes.amt}`} />
              <p className={`${classes.amt}`}>
                {parseFloat(subtotal + cgst + sgst).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        <Button size="block" align="spaced" onClick={handleOrderPlacement}>
          <div>
            <p className="text-sm font-medium">TOTAL</p>
            <div className="flex items-center">
              <BiRupee />
              <p className="text-lg font-medium">
                {parseFloat(subtotal + cgst + sgst).toFixed(2)}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <p>Place Order</p>
            <BsArrowRight className="ml-1" />
          </div>
        </Button>
      </Card>
    </motion.div>
  );
}

export default PlaceOrderCard;
