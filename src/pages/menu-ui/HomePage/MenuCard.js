import { useDispatch } from "react-redux";
import { BiRupee } from "react-icons/bi";
import { AiOutlineClockCircle, AiOutlinePlus } from "react-icons/ai";
import Card from "../components/Card";
import Button from "../components/Button";
import QtyButton from "../components/QtyButton";
import { increaseQuantity, setItem } from "../../../redux/reducers/menuReducer";

function MenuCard({
  className,
  id,
  name,
  price,
  waitingTime,
  desc,
  qty,
  img,
  onClick,
}) {
  const dispatch = useDispatch();
  const handleInc = () => {
    dispatch(increaseQuantity(id));
  };
  const handleClick = () => {
    dispatch(setItem(id));
    onClick();
  };
  return (
    <Card className={`bg-light-base2 dark:bg-dark-base2 ${className}`}>
      <div className="grid grid-cols-3 gap-1">
        <button
          type="button"
          className="col-span-2 text-start"
          onClick={handleClick}
        >
          <h2 className="font-medium text-light-text1 dark:text-dark-text1">
            {name}
          </h2>
          <span className="flex items-center">
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
            {desc}
          </p>
        </button>
        <div className="relative">
          <img
            className="mx-auto rounded-full"
            src={img}
            alt={name}
            width={150}
          />
          <div className="absolute inset-x-0 bottom-0">
            {qty === 0 ? (
              <Button variant="outline" size="block" onClick={handleInc}>
                <AiOutlinePlus className="mr-2" />
                ADD
              </Button>
            ) : (
              <QtyButton qty={qty} id={id} className="text-white" />
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default MenuCard;
