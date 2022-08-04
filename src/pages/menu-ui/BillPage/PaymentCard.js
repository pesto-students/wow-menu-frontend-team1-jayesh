import Card from "../components/Card";
import Button from "../components/Button";

// style for different props
const classes = {
  base: "absolute inset-x-0 bottom-0 pt-10 pb-20 bg-light-base3 dark:bg-dark-base3",
};

function PaymentCard({ className }) {
  return (
    <Card
      className={`
      ${classes.base}
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
