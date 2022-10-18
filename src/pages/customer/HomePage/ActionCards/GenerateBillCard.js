import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Card from "../../../../shared/components/Card";
import Button from "../../../../shared/components/Button";
import { setBill } from "../../../../store/reducers/billReducer";
import { resetCart } from "../../../../store/reducers/cartReducer";
import { resetOrder } from "../../../../store/reducers/orderReducer";
import CustomerBillService from "../../../../services/customerBill";

const classes = {
  base: "absolute inset-x-0 bottom-0 pt-10 pb-20 bg-light-base3 dark:bg-dark-base3",
};

function GenerateBillCard({ className }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { response, loading, error, getBill } = CustomerBillService();

  const handleGenerateBill = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once bill is generated new item can't be added in this Order",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#50D1AA",
      cancelButtonColor: "#FF7CA3",
      confirmButtonText: "Yes, Generate bill!",
      reverseButtons: true,
      width: 300,
    }).then((result) => {
      if (result.isConfirmed) {
        getBill();
      }
    });
  };

  useEffect(() => {
    if (response) {
      dispatch(setBill(response.data));
      dispatch(resetCart());
      dispatch(resetOrder());
      navigate("/bill");
    }
  }, [response]);

  useEffect(() => {
    if (loading) {
      Swal.fire({
        text: "Generating bill",
        width: 300,
        timer: 1000,
        showConfirmButton: false,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    }
  }, [loading]);

  useEffect(() => {
    if (error) {
      Swal.fire({
        title: "Are you online?",
        text: "Couldn't generate bill. Please check your Internet Connection?",
        icon: "question",
        width: 300,
      });
    }
  }, [error]);

  return (
    <motion.div
      initial={{ y: 150, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 150, opacity: 0 }}
    >
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
    </motion.div>
  );
}

export default GenerateBillCard;
