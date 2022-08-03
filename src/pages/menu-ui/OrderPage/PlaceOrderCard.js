import { BiRupee } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import Card from "../components/Card";
import Button from "../components/Button";

// style for different props
const classes = {
  base: "absolute inset-x-0 bottom-0 pt-10 pb-20 shadow-lg bg-light-base3 dark:bg-dark-base3",
  amt: "text-light-text1 dark:text-dark-text1 text-lg",
};

function PlaceOrderCard({ className, subtotal, cgst, sgst }) {
  return (
    <Card
      className={`
      ${classes.base}
      ${className}
  `}
    >
      <div>
        <div className="flex justify-between">
          <p className={`${classes.amt}`}>Subtotal</p>
          <div className="flex items-center">
            <BiRupee className={`${classes.amt}`} />
            <p className={`${classes.amt}`}>{subtotal}</p>
          </div>
        </div>
        <div className="flex justify-between">
          <p className={`${classes.amt}`}>CGST</p>
          <div className="flex items-center">
            <BiRupee className={`${classes.amt}`} />
            <p className={`${classes.amt}`}>{cgst}</p>
          </div>
        </div>
        <div className="flex justify-between">
          <p className={`${classes.amt}`}>SGST</p>
          <div className="flex items-center">
            <BiRupee className={`${classes.amt}`} />
            <p className={`${classes.amt}`}>{sgst}</p>
          </div>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between mb-2">
          <p className={`${classes.amt}`}>Total</p>
          <div className="flex items-center">
            <BiRupee className={`${classes.amt}`} />
            <p className={`${classes.amt}`}>{subtotal + cgst + sgst}</p>
          </div>
        </div>
      </div>
      <Button size="block" align="spaced">
        <div className="text-sm">
          <p className="text-sm font-medium">TOTAL</p>
          <div className="flex items-center">
            <BiRupee />
            <p className="text-lg font-medium">{subtotal + cgst + sgst}</p>
          </div>
        </div>
        <div className="flex items-center">
          <p>Place Order</p>
          <BsArrowRight className="ml-1" />
        </div>
      </Button>
    </Card>
  );
}

export default PlaceOrderCard;
