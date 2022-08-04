import { motion } from "framer-motion";
import { BiFilter } from "react-icons/bi";
import { FaChevronDown } from "react-icons/fa";
import food1Img1 from "../../../assets/images/food-1.png";
import food1Img2 from "../../../assets/images/food-2.png";
import food1Img3 from "../../../assets/images/food-3.png";

function DashboardAnalytics() {
  const mostOrdered = [
    {
      name: "Spicy seasoned seafood noodles",
      image: food1Img1,
      count: 200,
    },
    {
      name: "Salted pasta with mushroom sauce",
      image: food1Img2,
      count: 120,
    },
    {
      name: "Beef dumpling in hot and sour soup",
      image: food1Img3,
      count: 80,
    },
  ];
  return (
    <>
      <motion.main
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col flex-1 gap-6 p-4"
      >
        <header>
          <h1 className="text-3xl font-semibold leading-loose text-slate-800 dark:text-white">
            Analytics
          </h1>
          <div className="text-slate-700 dark:text-gray-300">
            {new Date().toDateString()}
          </div>
        </header>
        <hr className="border-gray-700 dark:border-gray-600" />
        <div className="grid h-32 grid-cols-3 gap-4">
          <div className="flex justify-between w-full px-4 py-3 bg-white rounded-lg dark:bg-gray-900">
            .
          </div>
          <div className="flex justify-between w-full px-4 py-3 bg-white rounded-lg dark:bg-gray-900">
            .
          </div>
          <div className="flex justify-between w-full px-4 py-3 bg-white rounded-lg dark:bg-gray-900">
            .
          </div>
        </div>
        <div className="w-full py-3 px-4 bg-white rounded-lg h-[28rem] dark:bg-gray-900">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold leading-loose text-slate-800 dark:text-white">
              Customer Report
            </h2>
            <button
              type="button"
              className="flex gap-x-2.5 py-3 px-4 rounded-lg border border-gray-700 bg-white dark:bg-gray-900"
            >
              <BiFilter className="w-5 h-5 text-sm text-slate-700 dark:text-white" />
              <span className="text-sm text-slate-700 dark:text-white">
                Filter Order
              </span>
            </button>
          </div>
          {/* <table className="w-full mt-2 text-left table-fixed ">
            <thead className="text-slate-300">
              <tr>
                <th>Customer</th>
                <th>Phone No.</th>
                <th>Total Payment</th>
                <th>No. of Visits</th>
              </tr>
            </thead>
            <tbody className="text-slate-400">
              <tr>
                <td>Pranshu</td>
                <td>+91 7206627155</td>
                <td>465</td>
                <td>1</td>
              </tr>
              <tr>
                <td>Witchy Woman</td>
                <td>+91 9206627155</td>
                <td>1042</td>
                <td>3</td>
              </tr>
              <tr>
                <td>Shining Star</td>
                <td>+91 8206627155</td>
                <td>799</td>
                <td>2</td>
              </tr>
            </tbody>
          </table> */}

          <div className="relative mt-2 overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Phone No.
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total Payment
                  </th>
                  <th scope="col" className="px-6 py-3">
                    No. of Visits
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Pranshu Sharma
                  </th>
                  <td className="px-6 py-4">+91 7206627155</td>
                  <td className="px-6 py-4">₹2999</td>
                  <td className="px-6 py-4">1</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Shubham Agrawal
                  </th>
                  <td className="px-6 py-4">+91 9206627155</td>
                  <td className="px-6 py-4">₹1999</td>
                  <td className="px-6 py-4">3</td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Tanmoy Barash
                  </th>
                  <td className="px-6 py-4">+91 8206627155</td>
                  <td className="px-6 py-4">₹1299</td>
                  <td className="px-6 py-4">1</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </motion.main>
      <motion.aside
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col py-4 pr-4 gap-y-4 w-96"
      >
        <div className="p-6 bg-white rounded-lg h-1/2 dark:bg-gray-900">
          <div className="flex justify-between mb-3">
            <h1 className="text-xl font-semibold leading-loose text-slate-800 dark:text-white">
              Most Ordered
            </h1>
            <button
              type="button"
              className="flex gap-x-2.5 py-3 px-4 rounded-lg border border-gray-700 bg-white dark:bg-gray-900"
            >
              <FaChevronDown className="text-sm text-slate-700 dark:text-white" />
              <span className="text-sm text-slate-700 dark:text-white">
                Today
              </span>
            </button>
          </div>
          <hr className="mb-3 border-gray-700 dark:border-gray-600" />
          <div>
            <div className="flex flex-col mb-3 gap-y-4">
              {mostOrdered.map((order) => (
                <div key={order.name} className="flex items-center gap-x-4">
                  <img className="w-10 h-10" src={order.image} alt="" />
                  <div className="flex flex-col gap-y-0.5">
                    <div className="text-sm font-medium text-slate-700 dark:text-white">
                      {order.name}
                    </div>
                    <div className="text-xs text-gray-700 dark:text-gray-500">
                      {`${order.count} dishes ordered`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="py-3.5 rounded-lg w-full border border-primary text-white bg-primary dark:bg-gray-900 dark:text-primary text-sm font-semibold"
            >
              View All
            </button>
          </div>
        </div>
        <div className="flex flex-col p-6 bg-white rounded-lg h-1/2 dark:bg-gray-900 gap-y-6">
          <h1 className="text-xl font-semibold leading-loose text-slate-800 dark:text-white">
            Orders Analysis
          </h1>
          <hr className="border-gray-700 dark:border-gray-600" />
        </div>
      </motion.aside>
    </>
  );
}

export default DashboardAnalytics;
