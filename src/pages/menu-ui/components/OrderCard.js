import { BiRupee, BiFoodTag } from "react-icons/bi";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import Card from "./Card";
import Button from "./Button";

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
                  <BiFoodTag
                    className={item.isVeg ? "text-green-600" : "text-red-800"}
                    size="24"
                  />
                  <div className="ml-2">
                    <h2 className={`${classes.title[theme]}`}>{item.name}</h2>
                    <div className="flex items-center">
                      <BiRupee className={`${classes.subtitle[theme]} mr-1`} />
                      <p className={`${classes.subtitle[theme]}`}>
                        {item.price}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  {variant === "details" ? (
                    <Button size="block" align="spaced">
                      <AiOutlineMinus className="mr-2" />
                      <p className="font-semibold">{item.qty}</p>
                      <AiOutlinePlus className="ml-2" />
                    </Button>
                  ) : (
                    <Button variant="outline">{status}</Button>
                  )}
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
        <>
          <hr />
          <Button size="block" variant="text" theme={theme} className="mt-2">
            Write instruction for Chef
          </Button>
        </>
      )}
    </Card>
  );
}

export default OrderCard;
