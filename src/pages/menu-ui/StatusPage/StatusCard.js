import { BiFoodTag } from "react-icons/bi";
import Card from "../components/Card";
import StatusChip from "../components/StatusChip";

// style for different props
const classes = {
  bg: "bg-light-base2 dark:bg-dark-base2",
  title: "text-light-text1 dark:text-dark-text1 font-medium",
  rejected: "line-through decoration-accent-red decoration-2",
};

function StatusCard({ className, items = [], status }) {
  return (
    <Card
      className={`
      ${classes.bg}
      ${className}
    `}
    >
      <div className="flex justify-between">
        <div>
          {items.map((item) => {
            return (
              <div className="flex mb-5" key={item.item.id}>
                <BiFoodTag
                  className={
                    item.item.isVeg
                      ? "mt-1 text-green-600"
                      : "mt-1 text-red-800"
                  }
                  size="20"
                />
                <div className="mb-3 ml-2">
                  <h2
                    className={`${classes.title} ${
                      status === "Rejected" ? classes.rejected : ""
                    }`}
                  >
                    {`${item.quantity} ${item.item.name}`}
                  </h2>
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

export default StatusCard;
