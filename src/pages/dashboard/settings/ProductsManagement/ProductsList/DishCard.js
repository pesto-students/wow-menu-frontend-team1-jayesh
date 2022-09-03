import { forwardRef } from "react";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Card from "../../../../../shared/components/Card";
import Switch from "./Switch";
import noImg from "../../../../../assets/images/noImg.png";

function DishCard(
  {
    id,
    image,
    name,
    price,
    description,
    active,
    available,
    onActiveChange,
    onAvailableChange,
  },
  ref,
) {
  const navigate = useNavigate();
  return (
    <Card
      ref={ref}
      className="relative flex flex-col w-auto px-4 pb-12 mt-24 overflow-visible transition duration-200 transform rounded-md cursor-pointer hover:scale-105 dark:border-light-text1 bg-light-base2 dark:bg-dark-base2 gap-y-3"
    >
      {image ? (
        <img
          className="absolute inset-x-0 w-32 h-32 mx-auto border-2 rounded-full bg-dark-text2 dark:bg-light-text1 border-dark-text2 dark:border-light-text1 -top-12"
          src={image}
          alt={name}
        />
      ) : (
        <img
          className="absolute inset-x-0 w-32 h-32 mx-auto border-2 rounded-full bg-dark-text2 dark:bg-light-text1 border-dark-text2 dark:border-light-text1 -top-12"
          src={noImg}
          alt={name}
        />
      )}
      <p className="mt-20 text-lg font-bold tracking-wide text-center text-light-text1 dark:text-dark-text1">
        {name}
      </p>
      <div className="text-lg text-center text-primary">₹{price}</div>
      <div className="text-center mb-14 text-light-text1 dark:text-dark-text1 line-clamp-3">
        {description}
      </div>
      <div className="absolute w-full py-3 -mx-4 cursor-pointer bottom-14">
        <div className="flex items-center justify-center text-light-text1 dark:text-dark-text1">
          <span className="text-xs">Active</span>
          <Switch
            value={active}
            onClick={() => onActiveChange(id, { isActive: !active })}
          />
          <span className="text-xs">Available</span>
          <Switch
            value={available}
            onClick={() => onAvailableChange(id, { isAvailable: !available })}
          />
        </div>
      </div>
      <div
        className="absolute bottom-0 w-full py-4 -mx-4 cursor-pointer bg-primary/40 rounded-b-md"
        aria-hidden="true"
        onClick={() => navigate(`/dashboard/settings/edit-product/${id}`)}
      >
        <div className="flex items-center justify-center text-center text-primary">
          <FaRegEdit />
          <span className="ml-2 text-sm">Edit Dish</span>
        </div>
      </div>
    </Card>
  );
}

export default forwardRef(DishCard);
