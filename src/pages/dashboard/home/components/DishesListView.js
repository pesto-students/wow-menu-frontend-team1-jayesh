import { FaChevronDown } from "react-icons/fa";
import DishCard from "./DishCard";
import food1Img1 from "../../../../assets/images/food-1.png";
import food1Img2 from "../../../../assets/images/food-2.png";
import food1Img3 from "../../../../assets/images/food-3.png";

function DishesListView() {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold leading-loose text-slate-800 dark:text-white">
          Choose Dishes
        </h2>
        <button
          type="button"
          className="flex gap-x-2.5 py-3 px-4 rounded-lg border border-gray-700 bg-white dark:bg-gray-900"
        >
          <FaChevronDown className="text-sm text-slate-700 dark:text-white" />
          <span className="text-sm text-slate-700 dark:text-white">
            Non Veg
          </span>
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 pr-3 overflow-y-auto h-[34rem]">
        <DishCard
          image={food1Img1}
          name="Spicy seasoned seafood noodles"
          price="200"
          description="Salted pasta with mushroom sauce..."
        />
        <DishCard
          image={food1Img2}
          name="Salted pasta with mushroom sauce"
          price="120"
          description="Spicy seasoned seafood noodles..."
        />
        <DishCard
          image={food1Img3}
          name="Beef dumpling in hot and sour soup"
          price="800"
          description="Salted pasta with mushroom sauce..."
        />
        <DishCard
          image={food1Img2}
          name="Salted pasta with mushroom sauce"
          price="120"
          description="Spicy seasoned seafood noodles..."
        />
        <DishCard
          image={food1Img3}
          name="Beef dumpling in hot and sour soup"
          price="800"
          description="Salted pasta with mushroom sauce..."
        />
        <DishCard
          image={food1Img1}
          name="Spicy seasoned seafood noodles"
          price="200"
          description="Salted pasta with mushroom sauce..."
        />
        <DishCard
          image={food1Img1}
          name="Spicy seasoned seafood noodles"
          price="200"
          description="Salted pasta with mushroom sauce..."
        />
        <DishCard
          image={food1Img2}
          name="Salted pasta with mushroom sauce"
          price="120"
          description="Spicy seasoned seafood noodles..."
        />
        <DishCard
          image={food1Img3}
          name="Beef dumpling in hot and sour soup"
          price="800"
          description="Salted pasta with mushroom sauce..."
        />
      </div>
    </div>
  );
}

export default DishesListView;
