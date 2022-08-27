import Swal from "sweetalert2";
import Card from "../../../shared/components/Card";
import Button from "../../../shared/components/Button";
import NotificationService from "../../../services/notification";

// style for different props
const classes = {
  base: "absolute inset-x-0 bottom-0 pt-10 pb-20 bg-light-base3 dark:bg-dark-base3",
};

function PaymentCard({ className, payOnline }) {
  const { payByCash } = NotificationService();

  const handleCall = () => {
    payByCash();
    Swal.fire({
      text: "Waiter is on his way",
      icon: "success",
      showConfirmButton: false,
      width: 300,
      timer: 1500,
    });
  };

  return (
    <Card
      className={`
      ${classes.base}
      ${className}
  `}
    >
      <div className="grid grid-cols-2 gap-1">
        <Button size="block" onClick={handleCall}>
          <p>Pay Cash</p>
        </Button>
        <Button size="block" onClick={payOnline}>
          <p>Online Payment</p>
        </Button>
      </div>
    </Card>
  );
}

export default PaymentCard;
