import { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { BiRupee, BiFoodTag } from "react-icons/bi";
import { AiOutlineClockCircle, AiOutlinePlus } from "react-icons/ai";
import Card from "../../../shared/components/Card";
import Button from "../../../shared/components/Button";
import QtyButton from "./QtyButton";
import { addToCart } from "../../../store/reducers/cartReducer";
import { setItem } from "../../../store/reducers/productReducer";

function MenuCard({ className, item }, ref) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const isItemPresentInCart = cart.findIndex((dish) => dish.id === item.id);
  const quantity =
    isItemPresentInCart === -1 ? 0 : cart[isItemPresentInCart].quantity;

  const handleSetItem = () => {
    dispatch(setItem(item));
  };
  return (
    <motion.div
      initial={{ x: 30, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      exit={{ x: -30, opacity: 0 }}
    >
      <Card
        className={`bg-light-base2 dark:bg-dark-base2 ${className}`}
        ref={ref}
      >
        <div className="grid grid-cols-3 gap-1">
          <button
            type="button"
            className="col-span-2 text-start"
            onClick={handleSetItem}
          >
            <h2 className="font-medium text-light-text1 dark:text-dark-text1">
              {item.name}
            </h2>
            <span className="flex items-center">
              <BiFoodTag
                className={
                  item.isVeg ? "text-green-600 mr-2" : "text-red-800 mr-2"
                }
                size="20"
              />
              <span className="flex items-center">
                <BiRupee className="mr-1 text-sm text-light-text1 dark:text-dark-text1" />
                <p className="text-sm text-light-text1 dark:text-dark-text1">
                  {item.price}
                </p>
              </span>
              {item.waitingTime > 0 && (
                <span className="flex items-center ml-3">
                  <AiOutlineClockCircle className="mr-1 text-sm text-light-text1 dark:text-dark-text1" />
                  <p className="text-sm text-light-text1 dark:text-dark-text1">
                    {item.waitingTime}m
                  </p>
                </span>
              )}
            </span>
            <p className="overflow-hidden text-sm line-clamp-3 text-light-text2 dark:text-dark-text2">
              {item.description}
            </p>
          </button>
          <div className="relative">
            {item.imageUrl && (
              <img
                className={`mx-auto rounded-full ${
                  item.isAvailable ? "" : "grayscale"
                }`}
                src={item.imageUrl}
                alt={item.name}
                width={150}
              />
            )}
            {item.isAvailable && (
              <div className="absolute inset-x-0 bottom-0">
                {quantity === 0 ? (
                  <Button
                    variant="outline"
                    size="block"
                    onClick={() =>
                      dispatch(addToCart({ ...item, quantity: 1 }))
                    }
                  >
                    <AiOutlinePlus className="mr-2" />
                    ADD
                  </Button>
                ) : (
                  <QtyButton
                    quantity={quantity}
                    id={item.id}
                    className="text-white"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default forwardRef(MenuCard);
