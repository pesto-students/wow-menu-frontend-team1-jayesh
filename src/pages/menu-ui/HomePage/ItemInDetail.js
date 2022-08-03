import { BiRupee } from "react-icons/bi";
import { GrSquare } from "react-icons/gr";
import { GiChiliPepper } from "react-icons/gi";
import QtyButton from "../components/QtyButton";
import Button from "../components/Button";
import Card from "../components/Card";
import CloseButton from "../components/CloseButton";

// style for different props
const classes = {
  base: "h-full flex flex-col z-20",
  bg: "bg-light-base2 dark:bg-dark-base2 pb-20",
  title: "font-medium text-xl mt-1 text-light-text1 dark:text-dark-text1",
  desc: "my-2 text-light-text2 dark:text-dark-text2",
};

function ItemInDetail({ className, item, onClose }) {
  return (
    <div className="absolute top-0 flex flex-col w-full h-full bg-gray-800/80">
      <div className="grow"> </div>
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
          <GrSquare
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
          <div className="grid grid-cols-6 gap-2">
            <div className="col-span-2">
              <QtyButton variant="outline" qty={1} />
            </div>

            <div className="col-span-4">
              <Button size="block" className="py-2 border-2 border-primary">
                Add Item
                <BiRupee className="ml-2 mr-1" />
                {!item.qty || item.qty === 0
                  ? item.price
                  : item.price * item.qty * item.price}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ItemInDetail;
