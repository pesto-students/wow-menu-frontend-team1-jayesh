import { FaRegEdit } from "react-icons/fa";

function DishCard({ image, name, price, description }) {
  return (
    <div className="flex flex-col w-auto px-4 pt-4 bg-white border rounded-md shadow-sm border-slate-700 dark:bg-gray-900 gap-y-3">
      <img className="w-24 h-24 mx-auto" src={image} alt="" />
      <div className="font-bold tracking-wide text-center text-md text-slate-500 dark:text-white">
        {name}
      </div>
      <div className="text-center text-primary">₹{price}</div>
      <div className="text-center text-slate-500 dark:text-gray-500">
        {description}
      </div>
      <div className="py-2  bg-[#ea7c695c] -mx-4 rounded-b-md cursor-pointer">
        <div className="flex items-center justify-center text-center text-primary">
          <FaRegEdit />
          <span className="ml-2 text-sm">Edit Dish</span>
        </div>
      </div>
    </div>
  );
}

export default DishCard;
