import { motion } from "framer-motion";
import { BiRupee, BiFoodTag } from "react-icons/bi";
import Card from "../../../../shared/components/Card";
import QtyButton from "../../components/QtyButton";
import Instruction from "./Instruction";
import emptyCart from "../../../../assets/images/emptyCart.svg";

const classes = {
  bg: "bg-light-base2 dark:bg-dark-base2",
  title: "text-light-text1 dark:text-dark-text1 font-medium",
  subtitle: "text-light-text1 dark:text-dark-text1",
};

function OrderCard({ className, items = [] }) {
  return (
    <motion.div
      initial={{ x: 30, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      exit={{ x: -30, opacity: 0 }}
    >
      <Card
        className={`
      ${classes.bg}
      ${className}
    `}
      >
        {items.map((item) => {
          return (
            <div className="grid grid-cols-3 gap-1 mb-5" key={item.id}>
              <div className="col-span-2">
                <div className="flex">
                  <BiFoodTag
                    className={
                      item.isVeg ? "text-green-600 mt-1" : "text-red-800 mt-1"
                    }
                    size="18"
                  />
                  <div className="ml-2">
                    <h2 className={`${classes.title}`}>{item.name}</h2>
                    <div className="flex items-center">
                      <BiRupee className={`${classes.subtitle} mr-1`} />
                      <p className={`${classes.subtitle}`}>
                        {parseFloat(item.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <div className="flex items-center justify-end mt-2">
                    <QtyButton
                      quantity={item.quantity}
                      id={item.id}
                      className="text-white"
                    />
                  </div>
                  <div className="flex items-center justify-end mt-2">
                    <BiRupee className={`${classes.subtitle} mr-1`} />
                    <p className={`${classes.subtitle}`}>
                      {parseFloat(item.quantity * item.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {items.length > 0 && (
          <>
            <hr />
            <Instruction />
          </>
        )}
        {items.length === 0 && (
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            exit={{ x: -30, opacity: 0 }}
          >
            <img src={emptyCart} alt="emptyCart" className="w-3/6 mx-auto " />
            <p className={`text-center ${classes.subtitle}`}>
              Your cart is empty. Add something from the menu
            </p>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
}

export default OrderCard;
