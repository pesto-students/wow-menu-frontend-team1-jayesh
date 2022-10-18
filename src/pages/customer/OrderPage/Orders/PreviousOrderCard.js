import { motion } from "framer-motion";
import { BiRupee } from "react-icons/bi";
import Card from "../../../../shared/components/Card";

const classes = {
  bg: "bg-light-base2 dark:bg-dark-base2",
  title: "text-light-text1 dark:text-dark-text1 font-medium",
  subtitle: "text-light-text1 dark:text-dark-text1",
};

function PreviousOrderCard({ className, items = [] }) {
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
        <div>
          {items.map((item) => {
            return (
              <div className="grid grid-cols-3 gap-1 mb-5" key={item.item.id}>
                <div className="col-span-2">
                  <div className="flex">
                    <div className="ml-2">
                      <h2 className={`${classes.title}`}>
                        {item.quantity} x {item.item.name}
                      </h2>
                      <div className="flex items-center">
                        <BiRupee className={`${classes.subtitle} mr-1`} />
                        <p className={`${classes.subtitle}`}>
                          {parseFloat(item.item.price).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <div className="flex items-center justify-end mt-2">
                      <BiRupee className={`${classes.subtitle} mr-1`} />
                      <p className={`${classes.subtitle}`}>
                        {parseFloat(item.quantity * item.item.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {items.length === 0 && (
          <div className={`text-center ${classes.subtitle}`}>
            No Dish to Order
          </div>
        )}
      </Card>
    </motion.div>
  );
}

export default PreviousOrderCard;
