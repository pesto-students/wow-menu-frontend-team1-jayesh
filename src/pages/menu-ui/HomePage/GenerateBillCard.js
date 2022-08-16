import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import { getBill } from "../../../store/reducers/billReducer";
import { resetCart } from "../../../store/reducers/cartReducer";
import { resetOrder } from "../../../store/reducers/orderReducer";

// style for different props
const classes = {
  base: "absolute inset-x-0 bottom-0 pt-10 pb-20 bg-light-base3 dark:bg-dark-base3",
};

function GenerateBillCard({ className }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGenerateBill = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once bill is generated new item can't be added in this Order",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#50D1AA",
      cancelButtonColor: "#FF7CA3",
      confirmButtonText: "Yes, Generate bill!",
      width: 300,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(resetCart());
        dispatch(getBill());
        dispatch(resetOrder());
        navigate("/bill");
      }
    });
  };

  return (
    <Card
      className={`
      ${classes.base}
      ${className}
  `}
    >
      <Button size="block" className="py-2.5" onClick={handleGenerateBill}>
        <div className="flex items-center">
          <p>Generate Bill</p>
        </div>
      </Button>
    </Card>
  );
}

export default GenerateBillCard;
