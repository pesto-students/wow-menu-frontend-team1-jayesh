import { GrSquare } from "react-icons/gr";
import Card from "../components/Card";
import StatusChip from "../components/StatusChip";

// style for different props
const classes = {
  bg: "bg-light-base2 dark:bg-dark-base2",
  title: "text-light-text1 dark:text-dark-text1 font-medium",
};

function OrderCard({ className, items = [], status }) {
  return (
    <Card
      className={`
      ${classes.bg}
      ${className}
    `}
    >
      <div className="flex">
        <div>
          {items.map((item) => {
            return (
              <div className="flex mb-5">
                <GrSquare
                  className={
                    item.isVeg ? "mt-1 text-green-600" : "mt-1 text-red-800"
                  }
                  size="18"
                />
                <div className="ml-2">
                  <h2 className={`${classes.title}`}>{item.name}</h2>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-start justify-end">
          <StatusChip status={status}>{status}</StatusChip>
        </div>
      </div>
    </Card>
  );
}

export default OrderCard;
