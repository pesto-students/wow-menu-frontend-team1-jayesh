import { BiRupee } from "react-icons/bi";
import { GrSquare } from "react-icons/gr";
import Card from "../components/Card";
import QtyButton from "../components/QtyButton";
import StatusChip from "../components/StatusChip";
import Textfield from "../components/Textfield";

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

function OrderCard({
  className,
  items = [],
  variant = "details",
  status,
  theme = "light",
}) {
  return (
    <Card
      className={`
      ${classes.bg[theme]}
      ${className}
    `}
    >
      <div>
        {items.map((item) => {
          return (
            <div className="grid grid-cols-3 gap-1 mb-5">
              <div className="col-span-2">
                <div className="flex">
                  <GrSquare
                    className={item.isVeg ? "text-green-600" : "text-red-800"}
                    size="24"
                  />
                  <div className="ml-2">
                    <h2 className={`${classes.title[theme]}`}>{item.name}</h2>
                    {variant === "details" && (
                      <div className="flex items-center">
                        <BiRupee
                          className={`${classes.subtitle[theme]} mr-1`}
                        />
                        <p className={`${classes.subtitle[theme]}`}>
                          {item.price}
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
                      <QtyButton qty={item.qty} className="text-white" />
                    ) : (
                      <StatusChip status={status} theme={theme}>
                        {status}
                      </StatusChip>
                    )}
                  </div>
                  <div className="flex items-center justify-end mt-2">
                    <BiRupee className={`${classes.subtitle[theme]} mr-1`} />
                    <p className={`${classes.subtitle[theme]}`}>
                      {item.qty * item.price}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {variant === "details" && (
        <div className="text-center">
          <hr />
          {/* <TextButton theme={theme}>Write instruction for Chef</TextButton> */}
          <Textfield theme={theme} placeholder="Write instruction for Chef" />
        </div>
      )}
    </Card>
  );
}

export default OrderCard;
