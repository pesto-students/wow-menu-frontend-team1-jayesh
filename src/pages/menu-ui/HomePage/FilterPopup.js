import { BiFoodTag } from "react-icons/bi";
import { GiChiliPepper } from "react-icons/gi";
import Card from "../components/Card";
import CloseButton from "../components/CloseButton";

function FilterPopup({ onClose }) {
  return (
    <div className="absolute top-0 flex flex-col w-full h-full bg-gray-800/80">
      <div className="grow"> </div>
      <div className="flex justify-center my-5">
        <CloseButton onClick={onClose} />
      </div>
      <Card className="pb-20 bg-light-base2 dark:bg-dark-base2">
        <div className="py-1">
          <div className="flex items-center justify-between p-2 form-check">
            <p className="flex text-light-text1 dark:text-dark-text1">
              <BiFoodTag className="mt-1 mr-1 text-green-600" size="16" />
              Veg
            </p>
            <input
              className="w-6 h-6 rounded cursor-pointer accent-primary"
              type="checkbox"
              name="veg"
            />
          </div>
          <div className="flex items-center justify-between p-2 form-check">
            <p className="flex text-light-text1 dark:text-dark-text1">
              <BiFoodTag className="mt-1 mr-1 text-red-600" size="16" />
              Non Veg
            </p>
            <input
              className="w-6 h-6 rounded cursor-pointer accent-primary"
              type="checkbox"
              name="nonveg"
            />
          </div>
          <hr className="my-2 border-light-base2 dark:border-dark-base2" />
          <p className="pl-2 text-lg font-semibold text-light-text1 dark:text-dark-text1">
            Spicy
          </p>
          <div className="flex items-center justify-between p-2 form-check">
            <p className="pl-2 text-light-text1 dark:text-dark-text1">Low</p>
            <input
              className="w-6 h-6 rounded cursor-pointer accent-primary"
              type="checkbox"
              name="spicyLow"
            />
          </div>
          <div className="flex items-center justify-between p-2 form-check">
            <p className="flex pl-2 text-light-text1 dark:text-dark-text1">
              Medium
              <GiChiliPepper className="mt-1 ml-1 text-red-600" size="16" />
            </p>
            <input
              className="w-6 h-6 rounded cursor-pointer accent-primary"
              type="checkbox"
              name="spicyMedium"
            />
          </div>
          <div className="flex items-center justify-between p-2 form-check">
            <p className="flex pl-2 text-light-text1 dark:text-dark-text1">
              High
              <GiChiliPepper className="mt-1 ml-1 text-red-600" size="16" />
              <GiChiliPepper className="mt-1 ml-1 text-red-600" size="16" />
            </p>
            <input
              className="w-6 h-6 rounded cursor-pointer accent-primary"
              type="checkbox"
              name="spicyHigh"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}

export default FilterPopup;
