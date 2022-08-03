import { BiRupee } from "react-icons/bi";
import moment from "moment";
import Card from "../components/Card";

function BillCard({
  className,
  restaurant,
  table,
  manager,
  billno,
  items,
  cgst,
  sgst,
  theme,
}) {
  const subtotal = items.reduce((a, c) => {
    return a + c.qty * c.price;
  }, 0);
  const cgstAmt = (cgst / 100) * subtotal;
  const sgstAmt = (sgst / 100) * subtotal;
  return (
    <Card className={`bg-${theme}-base2 ${className}`}>
      {/* heading */}
      <div>
        <h2 className={`text-${theme}-text1 text-lg font-semibold text-center`}>
          {restaurant.name}
        </h2>
        <p className={`text-${theme}-text1 text-center`}>
          {restaurant.address}
        </p>
        <hr />
        <h2
          className={`text-${theme}-text1 my-3 text-xl font-semibold text-center`}
        >
          TAX INVOICE
        </h2>
        <div className={`text-${theme}-text1 flex justify-between mb-2`}>
          <div>
            <p>
              <span className={`text-${theme}-text1 font-medium`}>Date: </span>
              {moment().format("D-mm-yyyy")}
            </p>
            <p>
              <span className={`text-${theme}-text1 font-medium`}>
                Table No:{" "}
              </span>{" "}
              {table}
            </p>
          </div>
          <div>
            <h2>
              <span className={`text-${theme}-text1 font-medium`}>
                Bill No:{" "}
              </span>{" "}
              {billno}
            </h2>
            <p>
              <span className={`text-${theme}-text1 font-medium`}>Host: </span>{" "}
              {manager.name}
            </p>
          </div>
        </div>
      </div>
      {/* items */}
      <div>
        <div className={`text-${theme}-text1 grid grid-cols-6 gap-1`}>
          <p className={`text-${theme}-text1 col-span-4 font-medium`}>
            Particulars
          </p>
          <p className={`text-${theme}-text1 font-medium text-end`}>Rate</p>
          <p className={`text-${theme}-text1 font-medium text-end`}>Amt</p>
        </div>
        {items.map((item) => {
          return (
            <div
              key={item.id}
              className={`text-${theme}-text1 grid grid-cols-6 gap-1 mb-1`}
            >
              <p className={`text-${theme}-text1 col-span-4 text-md`}>
                {item.qty} x {item.name}
              </p>
              <p className={`text-${theme}-text1 flex justify-end text-md`}>
                <BiRupee className={`text-${theme}-text1 mt-1`} /> {item.price}
              </p>
              <p className={`text-${theme}-text1 flex justify-end text-md`}>
                <BiRupee className={`text-${theme}-text1 mt-1`} />
                {item.qty * item.price}
              </p>
            </div>
          );
        })}
        <hr />
        <div className={`text-${theme}-text1 flex justify-between`}>
          <p className={`text-${theme}-text1 font-medium`}>Subtotal</p>
          <p className={`text-${theme}-text1 flex items-center`}>
            <BiRupee className={`text-${theme}-text1`} /> {subtotal}
          </p>
        </div>
        <div className={`text-${theme}-text1 flex justify-between`}>
          <p className={`text-${theme}-text1 font-medium`}>CGST</p>
          <p className={`text-${theme}-text1 flex items-center`}>
            <BiRupee className={`text-${theme}-text1`} />
            {cgstAmt}
          </p>
        </div>
        <div className={`text-${theme}-text1 flex justify-between`}>
          <p className={`text-${theme}-text1 font-medium`}>SGST</p>
          <p className={`text-${theme}-text1 flex items-center`}>
            <BiRupee className={`text-${theme}-text1`} /> {sgstAmt}
          </p>
        </div>
        <hr />
        <div className="flex justify-between my-3">
          <p className={`text-${theme}-text1 text-lg font-semibold`}>Total</p>

          <p className={`text-${theme}-text1 flex items-center`}>
            <BiRupee />
            {subtotal + cgstAmt + sgstAmt}
          </p>
        </div>
      </div>
    </Card>
  );
}

export default BillCard;
