import { motion } from "framer-motion";
import { AiOutlineHeart } from "react-icons/ai";
import { MdQrCode2 } from "react-icons/md";
import { TbDiscount2 } from "react-icons/tb";
import { BsShieldLock, BsInfoCircle } from "react-icons/bs";
import { useState } from "react";
import DishCard from "./components/DishCard";
import food1Img1 from "../../../assets/images/food-1.png";
import food1Img2 from "../../../assets/images/food-2.png";
import food1Img3 from "../../../assets/images/food-3.png";

function DashboardSettings() {
  const settingsOptions = [
    {
      id: 1,
      icon: <AiOutlineHeart />,
      title: "Appearance",
      subtitle: "Dark and Light Mode",
    },
    {
      id: 2,
      icon: <MdQrCode2 />,
      title: "QR Code",
      subtitle: "Share, Download QR Code",
    },
    {
      id: 3,
      icon: <TbDiscount2 />,
      title: "Products Management",
      subtitle: "Manage your product, pricing etc",
    },
    {
      id: 4,
      icon: <BsShieldLock />,
      title: "Security",
      subtitle: "Configure Kitchen",
    },
    {
      id: 5,
      icon: <BsInfoCircle />,
      title: "About Us",
      subtitle: "Find out more about WOW Menu",
    },
  ];
  const [selectedOptionId, setSelectedOptionId] = useState(1);
  return (
    <motion.main
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col flex-1 gap-6 p-4"
    >
      <header>
        <h1 className="text-3xl font-semibold leading-loose text-slate-800 dark:text-white">
          Settings
        </h1>
      </header>
      <hr className="border-gray-700 dark:border-gray-600" />
      <div className="flex flex-row pr-3">
        <div className="flex flex-col content-start w-1/4 py-4 bg-white rounded-lg h-[39rem] dark:bg-gray-900 gap-y-6 mr-4">
          {settingsOptions.map((element) => {
            return (
              <div
                key={element.id}
                onClick={() => {
                  setSelectedOptionId(element.id);
                }}
                aria-hidden="true"
                className={`flex w-full px-6 py-2 cursor-pointer hover:bg-[#ea7c6970] + ${
                  selectedOptionId === element.id
                    ? "bg-[#ea7c6970] border-2 border-x-primary border-[#ea7c6970]"
                    : ""
                }`}
              >
                <span
                  className={`flex pt-[5px] text-lg  + ${
                    selectedOptionId === element.id
                      ? "text-primary"
                      : "text-slate-800 dark:text-white"
                  }`}
                >
                  {element.icon}
                </span>
                <div className="ml-3">
                  <span
                    className={`flex text-lg + ${
                      selectedOptionId === element.id
                        ? "text-primary"
                        : "text-slate-800 dark:text-white"
                    }`}
                  >
                    {element.title}
                  </span>
                  <span className="text-sm text-slate-700 dark:text-slate-400">
                    {element.subtitle}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-4/5 py-3 px-4 bg-white rounded-lg h-[39rem] dark:bg-gray-900">
          <motion.div
            key={selectedOptionId}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-xl font-semibold leading-loose text-slate-800 dark:text-white">
              {settingsOptions[selectedOptionId - 1].title}
            </h3>
            <div className="grid grid-cols-3 gap-4 pr-3 overflow-y-auto h-[34rem] mt-2">
              {selectedOptionId === 3 && (
                <>
                  <div className="flex items-center justify-center w-auto px-4 pt-4 pb-6 text-center bg-white border-2 border-dashed rounded-md cursor-pointer border-primary dark:bg-gray-900 gap-y-3">
                    <div className="font-bold text-primary">
                      <div className="text-3xl">+</div>
                      <div>Add new dish</div>
                    </div>
                  </div>
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
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.main>
  );
}

export default DashboardSettings;
