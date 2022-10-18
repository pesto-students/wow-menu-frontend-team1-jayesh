import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { BiRupee, BiFoodTag } from "react-icons/bi";
import { GiChiliPepper } from "react-icons/gi";
import { useState } from "react";
import QtyButton from "./QtyButton";
import Button from "../../../shared/components/Button";
import Card from "../../../shared/components/Card";
import CloseButton from "./CloseButton";
import { addToCart, updateQuantity } from "../../../store/reducers/cartReducer";
import { setItem } from "../../../store/reducers/productReducer";

// style for different props
const classes = {
  bg: "bg-light-base2 dark:bg-dark-base2 pb-20 md:pb-0",
  title: "font-medium text-xl mt-1 text-light-text1 dark:text-dark-text1",
  description: "my-2 text-light-text2 dark:text-dark-text2",
};

function ItemInDetail() {
  const dispatch = useDispatch();
  const item = useSelector((state) => state.product.selectedItem);
  const cart = useSelector((state) => state.cart.items);
  const isItemPresentInCart = cart.findIndex((dish) => dish.id === item.id);
  const [localQty, setLocalQty] = useState(
    isItemPresentInCart === -1 ? 1 : cart[isItemPresentInCart].quantity,
  );
  const addInCart = (id) => {
    if (isItemPresentInCart === -1)
      dispatch(addToCart({ ...item, quantity: localQty }));
    else dispatch(updateQuantity({ id, quantity: localQty }));
    dispatch(setItem(""));
  };
  const handleInc = () => {
    if (localQty >= 20) {
      Swal.fire({
        title: "Order Limit Exceeded?",
        text: "You can't place more than 20 plates of a Single Item in a Order. If you need to order more than 20 plates please place this order and order again",
        icon: "warning",
        confirmButtonColor: "#50D1AA",
        confirmButtonText: "Ok",
        width: 300,
      });
    } else {
      setLocalQty(localQty + 1);
    }
  };
  const handleDec = () => {
    if (localQty === 1) dispatch(setItem(""));
    else setLocalQty(localQty - 1);
  };
  return (
    <motion.div
      initial={{ y: 150, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 150, opacity: 0 }}
      className="absolute top-0 z-10 flex flex-col justify-center w-full h-full bg-gray-800/80"
    >
      <div className="grow md:flex-none" />
      <div className="flex justify-center my-5">
        <CloseButton onClick={() => dispatch(setItem(""))} />
      </div>
      <Card
        className={`
          w-full md:w-[500px] xl:w-[600px] mx-auto
          ${classes.bg}
      `}
      >
        {item.imageUrl && (
          <div className="flex justify-center">
            <img
              className="w-3/6 rounded-lg text-light-text2"
              src={item.imageUrl}
              alt={item.name}
            />
          </div>
        )}
        <div className="grid grid-cols-3 gap-1 mt-4">
          <div className="col-span-2">
            <div className="flex">
              <BiFoodTag
                className={item.isVeg ? "text-green-600" : "text-red-800"}
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
            </div>
          </div>
          <div>
            {item.isAvailable && (
              <QtyButton
                variant="outline"
                quantity={localQty}
                onInc={handleInc}
                onDec={handleDec}
              />
            )}
          </div>
        </div>
        <p className={`${classes.description}`}>{item.description}</p>
        <div className="py-3">
          {item.isAvailable ? (
            <Button
              size="block"
              className="py-2 border-2 border-primary"
              onClick={() => addInCart(item.id)}
            >
              Add Item
              <BiRupee className="ml-2 mr-1" />
              {parseFloat(item.price * localQty).toFixed(2)}
            </Button>
          ) : (
            <div className="py-2 font-medium text-center text-white border-2 rounded bg-primary/60 border-primary/30">
              Unavailable
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}

export default ItemInDetail;
