import { useDispatch, useSelector } from "react-redux";
import { BiRupee, BiFoodTag } from "react-icons/bi";
import { AiOutlineClockCircle, AiOutlinePlus } from "react-icons/ai";
import Card from "./Card";
import Button from "./Button";
import QtyButton from "./QtyButton";
import { addToCart } from "../../../redux/reducers/cartReducer";
import { setItem } from "../../../redux/reducers/productReducer";

function MenuCard({
  className,
  id,
  name,
  price,
  waitingTime,
  description,
  img,
  isAvailable,
  isVeg,
}) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const isItemPresentInCart = cart.findIndex((item) => item.id === id);
  const qty = isItemPresentInCart === -1 ? 0 : cart[isItemPresentInCart].qty;

  const handleSetItem = () => {
    dispatch(setItem(id));
  };
  return (
    <Card className={`bg-light-base2 dark:bg-dark-base2 ${className}`}>
      <div className="grid grid-cols-3 gap-1">
        <button
          type="button"
          className="col-span-2 text-start"
          onClick={handleSetItem}
        >
          <h2 className="font-medium text-light-text1 dark:text-dark-text1">
            {name}
          </h2>
          <span className="flex items-center">
            <BiFoodTag
              className={isVeg ? "text-green-600 mr-2" : "text-red-800 mr-2"}
              size="20"
            />
            <span className="flex items-center">
              <BiRupee className="mr-1 text-sm text-light-text1 dark:text-dark-text1" />
              <p className="text-sm text-light-text1 dark:text-dark-text1">
                {price}
              </p>
            </span>
            {waitingTime > 0 && (
              <span className="flex items-center ml-3">
                <AiOutlineClockCircle className="mr-1 text-sm text-light-text1 dark:text-dark-text1" />
                <p className="text-sm text-light-text1 dark:text-dark-text1">
                  {waitingTime}m
                </p>
              </span>
            )}
          </span>
          <p className="overflow-hidden text-sm line-clamp-2 text-light-text2 dark:text-dark-text2">
            {description}
          </p>
        </button>
        <div className="relative">
          <img
            className={`mx-auto rounded-full ${isAvailable ? "" : "grayscale"}`}
            src={img}
            alt={name}
            width={150}
          />
          {isAvailable && (
            <div className="absolute inset-x-0 bottom-0">
              {qty === 0 ? (
                <Button
                  variant="outline"
                  size="block"
                  onClick={() => dispatch(addToCart({ id, price, qty: 1 }))}
                >
                  <AiOutlinePlus className="mr-2" />
                  ADD
                </Button>
              ) : (
                <QtyButton qty={qty} id={id} className="text-white" />
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

export default MenuCard;
