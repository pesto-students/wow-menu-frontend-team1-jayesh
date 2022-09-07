import { useSelector } from "react-redux";
import { BiRupee } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { motion } from "framer-motion";
import Card from "../../../../shared/components/Card";
import Button from "../../../../shared/components/Button";

const classes = {
  base: "absolute inset-x-0 bottom-0 pt-10 bg-light-base3 dark:bg-dark-base3 pb-20",
};

function ViewCard({ className }) {
  const cart = useSelector((state) => state.cart.items);
  const quantity = cart.reduce((sum, current) => sum + current.quantity, 0);
  const price = parseFloat(
    cart.reduce((sum, current) => sum + current.quantity * current.price, 0),
  ).toFixed(2);
  return (
    <motion.div
      initial={{ y: 150, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 150, opacity: 0 }}
    >
      <Card className={` ${classes.base} ${className} `}>
        <Button size="block" align="spaced" href="/order">
          <div className="text-sm">
            <p>
              {quantity} ITEM{quantity > 1 ? "S" : ""}
            </p>
            <div>
              <div className="flex items-center">
                <BiRupee />
                <p>{price}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <p>View Cart</p>
            <BsArrowRight className="ml-1" />
          </div>
        </Button>
      </Card>
    </motion.div>
  );
}

export default ViewCard;
