import { MdOutlineDelete } from "react-icons/md";
import food1Img1 from "../../../../assets/images/food-1.png";
import food1Img2 from "../../../../assets/images/food-2.png";
import food1Img3 from "../../../../assets/images/food-3.png";

function UnavailableItems() {
  const mostOrdered = [
    {
      name: "Spicy seasoned seafood noodles",
      image: food1Img1,
      count: 200,
    },
    {
      name: "Salted pasta with mushroom sauce",
      image: food1Img2,
      count: 120,
    },
    {
      name: "Beef dumpling in hot and sour soup",
      image: food1Img3,
      count: 80,
    },
  ];
  return (
    <div className="flex flex-col h-screen p-6 bg-white dark:bg-gray-900 gap-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold leading-loose text-slate-800 dark:text-white">
          Items Unavailable
        </h2>
      </div>
      <hr className="border-gray-700" />
      <div className="flex flex-col gap-y-4">
        {mostOrdered.map((order) => (
          <div key={order.name} className="flex items-center gap-x-4">
            <img className="w-10 h-10" src={order.image} alt="" />
            <div className="flex flex-col gap-y-0.5">
              <div className="text-sm font-medium text-slate-700 dark:text-white">
                {order.name}
              </div>
              <div className="text-xs text-gray-700 dark:text-gray-500">
                {`${order.count} dishes ordered`}
              </div>
            </div>
            <div className="p-2 ml-auto border rounded-lg cursor-pointer border-primary text-primary">
              <MdOutlineDelete />
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="py-3.5 rounded-lg w-full border border-primary text-white bg-primary dark:bg-gray-900 dark:text-primary text-sm font-semibold"
      >
        Make Everything Available
      </button>
    </div>
  );
}

export default UnavailableItems;
