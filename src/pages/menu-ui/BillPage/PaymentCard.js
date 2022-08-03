import Card from "../components/Card";
import Button from "../components/Button";

// style for different props
const classes = {
  base: "absolute inset-x-0 bottom-0 pt-10 pb-7",
  bg: {
    light: "bg-light-base2",
    dark: "bg-dark-base2",
  },
};

function PaymentCard({ className, theme = "light" }) {
  return (
    <Card
      className={`
      ${classes.base}
      ${classes.bg[theme]}
      ${className}
  `}
    >
      <div className="grid grid-cols-2 gap-1">
        <Button size="block">
          <p>Pay Cash</p>
        </Button>
        <Button size="block">
          <p>Online Payment</p>
        </Button>
      </div>
    </Card>
  );
}

export default PaymentCard;
