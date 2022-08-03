import { BiRupee } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import Card from "../components/Card";
import Button from "../components/Button";

// style for different props
const classes = {
  base: "absolute inset-x-0 bottom-0 pt-10 pb-7 shadow-lg",
  amt: {
    light: "text-light-text1 text-lg",
    dark: "text-dark-text1 text-lg",
  },
  bg: {
    light: "bg-light-base3",
    dark: "bg-dark-base3",
  },
};

function PlaceOrderCard({ className, subtotal, cgst, sgst, theme = "light" }) {
  return (
    <Card
      className={`
      ${classes.base}
      ${classes.bg[theme]}
      ${className}
  `}
    >
      <div>
        <div className="flex justify-between">
          <p className={`${classes.amt[theme]}`}>Subtotal</p>
          <div className="flex items-center">
            <BiRupee className={`${classes.amt[theme]}`} />
            <p className={`${classes.amt[theme]}`}>{subtotal}</p>
          </div>
        </div>
        <div className="flex justify-between">
          <p className={`${classes.amt[theme]}`}>CGST</p>
          <div className="flex items-center">
            <BiRupee className={`${classes.amt[theme]}`} />
            <p className={`${classes.amt[theme]}`}>{cgst}</p>
          </div>
        </div>
        <div className="flex justify-between">
          <p className={`${classes.amt[theme]}`}>SGST</p>
          <div className="flex items-center">
            <BiRupee className={`${classes.amt[theme]}`} />
            <p className={`${classes.amt[theme]}`}>{sgst}</p>
          </div>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between mb-2">
          <p className={`${classes.amt[theme]}`}>Total</p>
          <div className="flex items-center">
            <BiRupee className={`${classes.amt[theme]}`} />
            <p className={`${classes.amt[theme]}`}>{subtotal + cgst + sgst}</p>
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
