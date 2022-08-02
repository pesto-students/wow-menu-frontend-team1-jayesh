import { forwardRef } from "react";
import { BiRupee } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import Card from "./Card";
import Button from "./Button";

// style for different props
const classes = {
  base: "absolute inset-x-0 bottom-0 pt-10 pb-7",
  bg: {
    light: "bg-light-base2",
    dark: "bg-dark-base2",
  },
};

const ViewCard = forwardRef(({ className, price, qty, theme = "light" }) => (
  <Card
    className={`
      ${classes.base}
      ${classes.bg[theme]}
      ${className}
  `}
  >
    <Button size="block" align="spaced">
      <div className="text-sm">
        <p>
          {qty} ITEM{qty > 0 ? "S" : ""}
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
));

export default ViewCard;
