import { useSelector } from "react-redux";
import { BiRupee, BiFoodTag } from "react-icons/bi";
import Card from "../components/Card";
import QtyButton from "../components/QtyButton";
import StatusChip from "../components/StatusChip";
import Textfield from "../components/Textfield";

// style for different props
const classes = {
  bg: "bg-light-base2 dark:bg-dark-base2",
  title: "text-light-text1 dark:text-dark-text1 font-medium",
  subtitle: "text-light-text1 dark:text-dark-text1",
};

function OrderCard({ className, items = [], variant = "details", status }) {
  const products = useSelector((state) => state.product.items);
  return (
    <Card
      className={`
      ${classes.bg}
      ${className}
    `}
    >
      <div>
        {items.map((cartItem) => {
          const item = products.find((dish) => dish.id === cartItem.id);
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
                    {variant === "details" && (
                      <div className="flex items-center">
                        <BiRupee className={`${classes.subtitle} mr-1`} />
                        <p className={`${classes.subtitle}`}>{item.price}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <div className="flex items-center justify-end mt-2">
                    {variant === "details" ? (
                      <QtyButton
                        qty={cartItem.qty}
                        id={item.id}
                        className="text-white"
                      />
                    ) : (
                      <StatusChip status={status}>{status}</StatusChip>
                    )}
                  </div>
                  <div className="flex items-center justify-end mt-2">
                    <BiRupee className={`${classes.subtitle} mr-1`} />
                    <p className={`${classes.subtitle}`}>
                      {cartItem.qty * item.price}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {variant === "details" && items.length > 0 && (
        <div className="text-center">
          <hr />
          <Textfield placeholder="Write instruction for Chef" />
        </div>
      )}
      {items.length === 0 && (
        <div className={`text-center ${classes.subtitle}`}>
          No Dish to Order
        </div>
      )}
    </Card>
  );
}

export default OrderCard;
