import { BiRupee, BiFoodTag } from "react-icons/bi";
import { GiChiliPepper } from "react-icons/gi";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import QtyButton from "../components/QtyButton";
import Button from "../components/Button";
import Card from "../components/Card";
import CloseButton from "../components/CloseButton";
import { updateQuantity } from "../../../redux/reducers/menuReducer";

// style for different props
const classes = {
  base: "h-full flex flex-col z-20",
  bg: "bg-light-base2 dark:bg-dark-base2 pb-20",
  title: "font-medium text-xl mt-1 text-light-text1 dark:text-dark-text1",
  desc: "my-2 text-light-text2 dark:text-dark-text2",
};

function ItemInDetail({ className, onClose }) {
  const dispatch = useDispatch();
  const item = useSelector((state) => state.menu.selectedItem);
  const [localQty, setLocalQty] = useState(item.qty === 0 ? 1 : item.qty);
  const addToCart = (id) => {
    dispatch(updateQuantity({ id, qty: localQty }));
    onClose();
  };
  const handleInc = () => {
    setLocalQty(localQty + 1);
  };
  const handleDec = () => {
    if (localQty === 1) onClose();
    else setLocalQty(localQty - 1);
  };
  return (
    <div className="absolute top-0 flex flex-col w-full h-full bg-gray-800/80">
      <div className="grow" />
      <div className="flex justify-center my-5">
        <CloseButton onClick={onClose} />
      </div>
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
          <p className={`${classes.desc}`}>{item.desc}</p>
        </div>
        <div className="py-3">
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
                onClick={() => addToCart(item.id)}
              >
                Add Item
                <BiRupee className="ml-2 mr-1" />
                {parseFloat(item.price * localQty).toFixed(2)}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ItemInDetail;
