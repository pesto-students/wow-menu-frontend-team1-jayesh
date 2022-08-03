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
  bg: {
    light: "bg-light-base2",
    dark: "bg-dark-base2",
  },
  title: {
    light: "text-light-text1 font-medium text-xl mt-1",
    dark: "text-dark-text1 font-medium text-xl mt-1",
  },
  desc: {
    light: "text-light-text2 my-2",
    dark: "text-dark-text2 my-2",
  },
};

function ItemInDetail({
  className,
  name,
  price,
  isVeg,
  desc,
  qty,
  img,
  spicy = "low",
  theme = "light",
}) {
  return (
    <div className="absolute top-0 flex flex-col w-full h-full bg-gray-800/80">
      <div className="grow"> </div>
      <div className="flex justify-center my-5">
        <CloseButton />
      </div>
      <Card
        className={`
        ${classes.bg[theme]}
        ${className}
    `}
      >
        <div className="flex justify-center">
          <img className="w-3/6 rounded-full" src={img} alt={name} />
        </div>
        <div className="flex">
          <GrSquare
            className={isVeg ? "text-green-600" : "text-red-800"}
            size="24"
          />
          {spicy === "medium" && (
            <GiChiliPepper className="text-red-800" size="24" />
          )}
          {spicy === "high" && (
            <div className="flex">
              <GiChiliPepper className="text-red-800" size="24" />
              <GiChiliPepper className="text-red-800" size="24" />
            </div>
          )}
        </div>
        <div className="grow">
          <h2 className={`${classes.title[theme]}`}>{name}</h2>
          <p className={`${classes.desc[theme]}`}>{desc}</p>
        </div>
        <div className="py-3">
          <div className="grid grid-cols-6 gap-1">
            <div className="col-span-2">
              <QtyButton variant="outline" theme={theme} qty={1} />
            </div>

            <div className="col-span-4">
              <Button size="block" className="py-2 border-2 border-primary">
                Add Item
                <BiRupee className="ml-2 mr-1" />
                {qty === 0 ? price : price * 2}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ItemInDetail;
