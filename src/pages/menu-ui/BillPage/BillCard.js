import { BiRupee } from "react-icons/bi";
import moment from "moment";
import Card from "../components/Card";

function BillCard({ className, restaurant, manager, billno, items }) {
  const subtotal = items.reduce((a, c) => {
    return a + c.qty * c.price;
  }, 0);
  const cgstAmt = (restaurant.cgst / 100) * subtotal;
  const sgstAmt = (restaurant.sgst / 100) * subtotal;
  return (
    <Card className={`bg-light-base2 dark:bg-dark-base2 ${className}`}>
      {/* heading */}
      <div>
        <h2 className="text-lg font-semibold text-center text-light-text1 dark:text-dark-text1">
          {restaurant.name}
        </h2>
        <p className="text-center text-light-text1 dark:text-dark-text1">
          {restaurant.address}
        </p>
        <hr />
        <h2 className="my-3 text-xl font-semibold text-center text-light-text1 dark:text-dark-text1">
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
              {restaurant.table}
            </p>
          </div>
          <div>
            <h2>
              <span className="font-medium text-light-text1 dark:text-dark-text1">
                Bill No:
              </span>
              {billno}
            </h2>
            <p>
              <span className="font-medium text-light-text1 dark:text-dark-text1">
                Host:
              </span>
              {manager.name}
            </p>
          </div>
        </div>
      </div>
      {/* items */}
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
        {items.map((item) => {
          return (
            <div
              key={item.id}
              className="grid grid-cols-4 gap-1 mb-3 text-light-text1 dark:text-dark-text1"
            >
              <p className="col-span-2 text-light-text1 dark:text-dark-text1 text-md">
                {item.qty} x {item.name}
              </p>
              <p className="flex justify-end text-light-text1 dark:text-dark-text1 text-md">
                {parseFloat(item.price).toFixed(2)}
              </p>
              <p className="flex justify-end text-light-text1 dark:text-dark-text1 text-md">
                {parseFloat(item.qty * item.price).toFixed(2)}
              </p>
            </div>
          );
        })}
        <hr />
        <div className="flex justify-between text-light-text1 dark:text-dark-text1">
          <p className="font-medium text-light-text1 dark:text-dark-text1">
            Subtotal
          </p>
          <p className="flex items-center text-light-text1 dark:text-dark-text1">
            <BiRupee className="text-light-text1 dark:text-dark-text1" />
            {parseFloat(subtotal).toFixed(2)}
          </p>
        </div>
        <div className="flex justify-between text-light-text1 dark:text-dark-text1">
          <p className="font-medium text-light-text1 dark:text-dark-text1">
            CGST
          </p>
          <p className="flex items-center text-light-text1 dark:text-dark-text1">
            <BiRupee className="text-light-text1 dark:text-dark-text1" />
            {parseFloat(cgstAmt).toFixed(2)}
          </p>
        </div>
        <div className="flex justify-between text-light-text1 dark:text-dark-text1">
          <p className="font-medium text-light-text1 dark:text-dark-text1">
            SGST
          </p>
          <p className="flex items-center text-light-text1 dark:text-dark-text1">
            <BiRupee className="text-light-text1 dark:text-dark-text1" />
            {parseFloat(sgstAmt).toFixed(2)}
          </p>
        </div>
        <hr />
        <div className="flex justify-between my-3">
          <p className="text-lg font-semibold text-light-text1 dark:text-dark-text1">
            Total
          </p>

          <p className="flex items-center text-light-text1 dark:text-dark-text1">
            <BiRupee />
            {parseFloat(subtotal + cgstAmt + sgstAmt).toFixed(2)}
          </p>
        </div>
      </div>
    </Card>
  );
}

export default BillCard;
