import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BillCard from "./BillCard";
import PaymentCard from "./PaymentCard";
import RazorpayService from "../../../services/razorpay";
import Card from "../../../shared/components/Card";
import noBill from "../../../assets/images/noBill.svg";

function loadRazorpay() {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
  });
}

function BillPage() {
  const restaurant = useSelector((state) => state.restaurant.details);
  const billDetails = useSelector((state) => state.bill.details);
  const billloading = useSelector((state) => state.bill.loading);
  const [billPaid, setBillPaid] = useState(false);
  const { response: paymentData, getPaymentDetails } = RazorpayService();

  const openPayModal = async () => {
    const res = await loadRazorpay();
    if (!res) {
      console.warn(
        "Razorpay SDK failed to load. Please check you internet connection",
      );
      return;
    }
    getPaymentDetails(billDetails.id);
  };

  useEffect(() => {
    if (paymentData) {
      const options = {
        key: "rzp_test_XHR14CbtOV2SNx",
        amount: paymentData.data.amount,
        name: restaurant.name,
        description: restaurant.address,
        order_id: paymentData.data.id,
        handler(res) {
          if (res.razorpay_order_id) {
            setBillPaid(true);
            Swal.fire({
              text: "Payment Received",
              icon: "success",
              showConfirmButton: false,
              width: 300,
              timer: 1500,
            });
          }
        },
        theme: {
          color: "#252836",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    }
  }, [paymentData]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="h-full p-4 overflow-x-hidden overflow-y-auto customer bg-lightPattern"
      >
        <h2 className="text-2xl font-semibold text-center text-light-text1 dark:text-dark-text1">
          Bill
        </h2>
        {billloading && (
          <div className="flex my-3 space-x-4 animate-pulse">
            <div className="flex-1 py-1 space-y-6">
              <div className="h-2 rounded bg-slate-300 dark:bg-slate-700" />
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 col-span-2 rounded bg-slate-300 dark:bg-slate-700" />
                  <div className="h-2 col-span-1 rounded bg-slate-300 dark:bg-slate-700" />
                </div>
                <div className="h-2 rounded bg-slate-300 dark:bg-slate-700" />
              </div>
            </div>
          </div>
        )}
        {billDetails && (
          <div className="w-full mx-auto mt-5 mb-56 md:w-4/6 lg:w-2/6 ">
            <BillCard bill={billDetails} restaurant={restaurant} />
          </div>
        )}
        {!billloading && !billDetails && (
          <Card className="mt-4 bg-light-base2 dark:bg-dark-base2">
            <img src={noBill} alt="emptyCart" className="w-3/6 mx-auto " />
            <p className="mt-4 text-center text-light-text1 dark:text-dark-text1">
              Nothing ordered yet. Add something from the menu.
            </p>
          </Card>
        )}
      </motion.div>
      {billDetails && !billPaid && <PaymentCard payOnline={openPayModal} />}
    </>
  );
}

export default BillPage;
