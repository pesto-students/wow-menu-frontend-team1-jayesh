import { GrSquare } from "react-icons/gr";
import Card from "../components/Card";
import StatusChip from "../components/StatusChip";

// style for different props
const classes = {
  bg: {
    light: "bg-light-base2",
    dark: "bg-dark-base2",
  },
  title: {
    light: "text-light-text1 font-medium",
    dark: "text-dark-text1 font-medium",
  },
  subtitle: {
    light: "text-light-text1",
    dark: "text-dark-text1",
  },
};

function OrderCard({ className, items = [], status, theme = "light" }) {
  return (
    <Card
      className={`
      ${classes.bg[theme]}
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
                    item.isVeg ? "mt-2 text-green-600" : "mt-2 text-red-800"
                  }
                  size="24"
                />
                <div className="ml-2">
                  <h2 className={`${classes.title[theme]}`}>{item.name}</h2>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-start justify-end">
          <StatusChip status={status} theme={theme}>
            {status}
          </StatusChip>
        </div>
      </div>
    </Card>
  );
}

export default OrderCard;
