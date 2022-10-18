import { BiFoodTag } from "react-icons/bi";
import { motion } from "framer-motion";
import Card from "../../../shared/components/Card";
import CloseButton from "../components/CloseButton";

function FilterPopup({ onClose, onSelect, selectedOption }) {
  const handleInput = (option) => {
    onSelect(option);
    onClose();
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute top-0 flex flex-col w-full h-full bg-gray-800/80"
    >
      <div className="grow"> </div>
      <div className="flex justify-center my-5">
        <CloseButton onClick={onClose} />
      </div>
      <motion.div
        initial={{ y: 150, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 150, opacity: 0 }}
      >
        <Card className="pb-20 bg-light-base2 dark:bg-dark-base2">
          <div className="py-1">
            <div className="flex items-center justify-between p-2 form-check">
              <p className="flex text-light-text1 dark:text-dark-text1">
                <BiFoodTag className="mt-1 mr-1 text-green-600" size="16" />
                Veg
              </p>
              <input
                className="w-6 h-6 rounded cursor-pointer accent-green-600"
                type="radio"
                name="vegNonveg"
                defaultChecked={selectedOption === "veg"}
                onInput={() => handleInput("veg")}
              />
            </div>
            <div className="flex items-center justify-between p-2 form-check">
              <p className="flex text-light-text1 dark:text-dark-text1">
                <BiFoodTag className="mt-1 mr-1 text-red-600" size="16" />
                Non Veg
              </p>
              <input
                className="w-6 h-6 rounded cursor-pointer accent-red-600"
                type="radio"
                name="vegNonveg"
                defaultChecked={selectedOption === "nonveg"}
                onInput={() => handleInput("nonveg")}
              />
            </div>
            <div className="flex items-center justify-between p-2 form-check">
              <p className="flex text-light-text1 dark:text-dark-text1">
                <BiFoodTag className="mt-1 mr-1 text-green-600" size="16" />
                <BiFoodTag className="mt-1 mr-1 text-red-600" size="16" />
                Both
              </p>
              <input
                className="w-6 h-6 rounded cursor-pointer accent-orange-600"
                type="radio"
                name="vegNonveg"
                defaultChecked={selectedOption === ""}
                onInput={() => handleInput("")}
              />
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}

export default FilterPopup;
