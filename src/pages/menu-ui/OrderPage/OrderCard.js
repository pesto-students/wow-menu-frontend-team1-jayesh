import { BiRupee, BiFoodTag } from "react-icons/bi";
import Card from "../components/Card";
import QtyButton from "../components/QtyButton";
import StatusChip from "../components/StatusChip";
import Textfield from "../components/Textfield";

const classes = {
  bg: "bg-light-base2 dark:bg-dark-base2",
  title: "text-light-text1 dark:text-dark-text1 font-medium",
  subtitle: "text-light-text1 dark:text-dark-text1",
};

function OrderCard({ className, items = [], variant = "details", status }) {
  return (
    <Card
      className={`
      ${classes.bg}
      ${className}
    `}
    >
      <div>
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
                    {variant === "details" && (
                      <div className="flex items-center">
                        <BiRupee className={`${classes.subtitle} mr-1`} />
                        <p className={`${classes.subtitle}`}>
                          {parseFloat(item.price).toFixed(2)}
                        </p>
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
                        qty={item.qty}
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
                      {parseFloat(item.qty * item.price).toFixed(2)}
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
