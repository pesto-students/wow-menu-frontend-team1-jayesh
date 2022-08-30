import { forwardRef } from "react";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function DishCard({ id, image, name, price, description }, ref) {
  const navigate = useNavigate();
  return (
    <div
      ref={ref}
      className="relative flex flex-col w-auto px-4 pt-4 pb-12 bg-white border rounded-md shadow-sm border-slate-700 dark:bg-gray-900 gap-y-3"
    >
      <img className="w-24 h-24 mx-auto rounded-full" src={image} alt="" />
      <div className="font-bold tracking-wide text-center text-md text-slate-500 dark:text-white">
        {name}
      </div>
      <div className="text-center text-primary">₹{price}</div>
      <div className="text-center text-slate-500 dark:text-gray-500 line-clamp-3">
        {description}
      </div>
      <div
        className="absolute bottom-0 w-full py-2 bg-[#ea7c695c] -mx-4 rounded-b-md cursor-pointer"
        aria-hidden="true"
        onClick={() => navigate(`/dashboard/settings/edit-product/${id}`)}
      >
        <div className="flex items-center justify-center text-center text-primary">
          <FaRegEdit />
          <span className="ml-2 text-sm">Edit Dish</span>
        </div>
      </div>
    </div>
  );
}

export default forwardRef(DishCard);
