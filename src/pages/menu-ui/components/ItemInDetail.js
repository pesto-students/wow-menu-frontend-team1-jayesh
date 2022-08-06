import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { BiRupee, BiFoodTag } from "react-icons/bi";
import { GiChiliPepper } from "react-icons/gi";
import { useState } from "react";
import QtyButton from "./QtyButton";
import Button from "./Button";
import Card from "./Card";
import CloseButton from "./CloseButton";
import { addToCart, updateQuantity } from "../../../redux/reducers/cartReducer";
import { setItem } from "../../../redux/reducers/productReducer";

// style for different props
const classes = {
  bg: "bg-light-base2 dark:bg-dark-base2 pb-20",
  title: "font-medium text-xl mt-1 text-light-text1 dark:text-dark-text1",
  description: "my-2 text-light-text2 dark:text-dark-text2",
};

function ItemInDetail({ className }) {
  const dispatch = useDispatch();
  const item = useSelector((state) => state.product.selectedItem);
  const cart = useSelector((state) => state.cart.items);
  const isItemPresentInCart = cart.findIndex((dish) => dish.id === item.id);
  const [localQty, setLocalQty] = useState(
    isItemPresentInCart === -1 ? 1 : cart[isItemPresentInCart].qty,
  );
  const addInCart = (id) => {
    if (isItemPresentInCart === -1)
      dispatch(addToCart({ ...item, qty: localQty }));
    else dispatch(updateQuantity({ id, qty: localQty }));
    dispatch(setItem(""));
  };
  const handleInc = () => {
    setLocalQty(localQty + 1);
  };
  const handleDec = () => {
    if (localQty === 1) dispatch(setItem(""));
    else setLocalQty(localQty - 1);
  };
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute top-0 z-10 flex flex-col w-full h-full bg-gray-800/80"
      >
        <div className="grow" />
        <div className="flex justify-center my-5">
          <CloseButton onClick={() => dispatch(setItem(""))} />
        </div>
        <motion.div
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 150, opacity: 0 }}
        >
          <Card
            className={`
          ${classes.bg}
          ${className}
      `}
          >
            <div className="flex justify-center">
              <img
                className="w-3/6 rounded-full text-light-text2"
                src={item.img}
                alt={item.name}
              />
            </div>
            <div className="flex">
              <BiFoodTag
                className={item.is_veg ? "text-green-600" : "text-red-800"}
                size="24"
              />
              {item.spicy === "medium" && (
                <GiChiliPepper className="text-red-800" size="24" />
              )}
              {item.spicy === "high" && (
                <div className="flex">
                  <GiChiliPepper className="text-red-800" size="24" />
                  <GiChiliPepper className="text-red-800" size="24" />
                </div>
              )}
            </div>
            <div className="grow">
              <h2 className={`${classes.title}`}>{item.name}</h2>
              <p className={`${classes.description}`}>{item.description}</p>
            </div>
            <div className="py-3">
              {item.isAvailable ? (
                <div className="grid grid-flow-col gap-2 auto-cols-auto">
                  <div>
                    <QtyButton
                      variant="outline"
                      qty={localQty}
                      onInc={handleInc}
                      onDec={handleDec}
                    />
                  </div>
                  <div>
                    <Button
                      size="block"
                      className="py-2 border-2 border-primary"
                      onClick={() => addInCart(item.id)}
                    >
                      Add Item
                      <BiRupee className="ml-2 mr-1" />
                      {parseFloat(item.price * localQty).toFixed(2)}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="py-2 font-medium text-center text-white border-2 rounded bg-primary/60 border-primary/30">
                  Unavailable
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ItemInDetail;
