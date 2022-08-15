import { motion } from "framer-motion";
import { jsPDF } from "jspdf";
import { AiOutlineCloudDownload } from "react-icons/ai";
import moment from "moment";
import Card from "../components/Card";
import Button from "../components/Button";

function BillCard({ className, restaurant, bill }) {
  const handleDownload = () => {
    const element = document.querySelector("#bill");
    // eslint-disable-next-line
    const doc = new jsPDF("p", "pt", "c5", "putOnlyUsedFonts");
    doc.html(element, {
      callback: (d) => {
        d.setTextColor(50);
        d.save("Test");
      },
      x: 60,
      y: 30,
    });
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      exit={{ opacity: 0 }}
    >
      <Card className={`bg-light-base2 dark:bg-dark-base2 ${className} p-0`}>
        <div id="bill" className="p-2 bg-light-base2 dark:bg-dark-base2">
          <div>
            <h2 className="text-lg font-semibold text-center text-light-text1 dark:text-dark-text1">
              {restaurant.name}
            </h2>
            <p className="text-center text-light-text1 dark:text-dark-text1">
              {restaurant.address}
            </p>
            <p className="text-center text-light-text1 dark:text-dark-text1">
              GSTIN:{restaurant.gstNo}
            </p>
            <p className="text-center text-light-text1 dark:text-dark-text1">
              Phone:{restaurant.phoneNo}
            </p>
            {/* <hr /> */}
            <h2 className="mt-5 mb-3 text-xl font-semibold text-center text-light-text1 dark:text-dark-text1">
              TAX INVOICE
            </h2>
            <div className="flex justify-between mb-2 text-light-text1 dark:text-dark-text1">
              <div>
                <p>
                  <span className="font-medium text-light-text1 dark:text-dark-text1">
                    Date:
                  </span>
                  {moment().format("DD-MM-yyyy")}
                </p>
                <p>
                  <span className="font-medium text-light-text1 dark:text-dark-text1">
                    Table No:
                  </span>
                  {bill.tableNo}
                </p>
              </div>
              <div>
                <h2>
                  <span className="font-medium text-light-text1 dark:text-dark-text1">
                    Bill No:
                  </span>
                  {bill.id}
                </h2>
                <p>
                  <span className="font-medium text-light-text1 dark:text-dark-text1">
                    Host:
                  </span>
                  {bill.createdBy}
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-4 gap-1 mb-2 underline text-light-text1 dark:text-dark-text1">
              <p className="col-span-2 font-medium text-light-text1 dark:text-dark-text1">
                Particulars
              </p>
              <p className="font-medium text-light-text1 dark:text-dark-text1 text-end">
                Rate
              </p>
              <p className="font-medium text-light-text1 dark:text-dark-text1 text-end">
                Amt
              </p>
            </div>
            {bill.items.map((item) => {
              return (
                <div
                  key={item.itemId}
                  className="grid grid-cols-4 gap-1 mb-3 text-light-text1 dark:text-dark-text1"
                >
                  <p className="col-span-2 text-light-text1 dark:text-dark-text1 text-md">
                    {item.quantity} x {item.name}
                  </p>
                  <p className="flex justify-end text-light-text1 dark:text-dark-text1 text-md">
                    {parseFloat(item.price).toFixed(2)}
                  </p>
                  <p className="flex justify-end text-light-text1 dark:text-dark-text1 text-md">
                    {parseFloat(item.quantity * item.price).toFixed(2)}
                  </p>
                </div>
              );
            })}
            {/* <hr /> */}
            <div className="flex justify-between mt-5 text-light-text1 dark:text-dark-text1">
              <p className="font-medium text-light-text1 dark:text-dark-text1">
                Subtotal
              </p>
              <p className=" text-light-text1 dark:text-dark-text1">
                {parseFloat(bill.subtotal).toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between text-light-text1 dark:text-dark-text1">
              <p className="font-medium text-light-text1 dark:text-dark-text1">
                CGST
              </p>
              <p className=" text-light-text1 dark:text-dark-text1">
                {parseFloat(bill.cgst).toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between text-light-text1 dark:text-dark-text1">
              <p className="font-medium text-light-text1 dark:text-dark-text1">
                SGST
              </p>
              <p className="text-light-text1 dark:text-dark-text1">
                {parseFloat(bill.sgst).toFixed(2)}
              </p>
            </div>
            {/* <hr /> */}
            <div className="flex justify-between mt-5 mb-3">
              <p className="text-lg font-semibold text-light-text1 dark:text-dark-text1">
                Total
              </p>

              <p className=" text-light-text1 dark:text-dark-text1">
                {parseFloat(bill.total).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </Card>
      <div className="flex justify-end">
        <Button className="mt-2" onClick={handleDownload}>
          <AiOutlineCloudDownload />
          Download
        </Button>
      </div>
    </motion.div>
  );
}

export default BillCard;
