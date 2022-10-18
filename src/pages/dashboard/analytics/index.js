import { useEffect } from "react";
import { motion } from "framer-motion";
import { BiFoodMenu } from "react-icons/bi";
import { GiHotMeal } from "react-icons/gi";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Header from "../components/Header";
import AnalyticService from "../../../services/analytics";
import BillService from "../../../services/dashboardBill";
import FeatureCard from "./FeatureCard";
import Card from "../../../shared/components/Card";
import noImg from "../../../assets/images/noImg.png";

ChartJS.register(ArcElement, Tooltip, Legend);
function DashboardAnalytics() {
  const restaurantId = useSelector((state) => state.restaurant.details.id);
  const { response: analytics, getAnalytics } = AnalyticService();
  const { response: bills, getBills } = BillService();
  useEffect(() => {
    if (restaurantId) {
      getAnalytics();
      getBills();
    }
  }, []);

  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="relative w-screen h-screen overflow-x-hidden bg-light-base1 dark:bg-dark-base1"
    >
      <div className="flex flex-wrap ml-28">
        <main className="relative flex flex-col h-screen gap-4 pr-4 overflow-x-hidden overflow-y-auto grow">
          <Header name="Analytics" />
          <div className="grid gap-4 sm:grid-cols-3">
            <FeatureCard
              icon={<HiOutlineCurrencyRupee className="text-accent-violet" />}
              title={
                analytics?.data?.totalRevenue
                  ? `₹ ${analytics?.data?.totalRevenue}`
                  : "₹ 0"
              }
              subtitle="Total Revenue"
            />
            <FeatureCard
              icon={<GiHotMeal className="text-accent-red" />}
              title={
                analytics?.data?.totalQuantity
                  ? analytics?.data?.totalQuantity
                  : "0"
              }
              subtitle="Items Ordered"
            />
            <FeatureCard
              icon={<BiFoodMenu className="text-primary" />}
              title={
                analytics?.data?.ordersCount
                  ? analytics?.data?.ordersCount
                  : "0"
              }
              subtitle="Total Orders"
            />
          </div>
          <Card className="mb-4 grow bg-light-base2 dark:bg-dark-base2">
            <h2 className="mb-5 text-xl font-semibold leading-loose text-light-text1 dark:text-dark-text1">
              Billing Report
            </h2>
            <table className="w-full text-sm text-left text-gray-500 table-auto dark:text-gray-400">
              <thead className="text-gray-700 text-md bg-gray-50 dark:bg-gray-800 dark:text-gray-300">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Bill Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Subtotal
                  </th>
                  <th scope="col" className="px-6 py-3 text-left">
                    GST
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Payment Mode
                  </th>
                </tr>
              </thead>
              <tbody>
                {bills &&
                  bills.data &&
                  bills.data.map((bill) => {
                    return (
                      <tr
                        key={bill.id}
                        className="text-gray-900 bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium whitespace-nowrap"
                        >
                          #{bill.id.substring(18).toUpperCase()}
                        </th>
                        <td className="px-6 py-4">
                          ₹ {parseFloat(bill.subtotal).toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          ₹ {parseFloat(bill.cgst + bill.sgst).toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          ₹ {parseFloat(bill.total).toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          {bill.paymentMode && bill.paymentMode === "Online"
                            ? "Online"
                            : "Cash"}
                        </td>
                      </tr>
                    );
                  })}
                {bills && bills.data.length === 0 && (
                  <tr>
                    <td
                      className="px-6 py-4 text-center text-slate-700 dark:text-gray-500"
                      colSpan={5}
                    >
                      No bills have been generated yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {!bills && (
              <div className="animate-pulse">
                <div className="w-full h-10 mt-2 rounded bg-slate-300 dark:bg-slate-700" />
                <div className="w-full h-10 mt-2 rounded bg-slate-300 dark:bg-slate-700" />
                <div className="w-full h-10 mt-2 rounded bg-slate-300 dark:bg-slate-700" />
              </div>
            )}
          </Card>
        </main>
        <aside className="flex w-full py-4 pr-4 xl:flex-col gap-y-4 xl:w-96">
          <Card className="w-1/2 mr-4 xl:w-full xl:mr-0 bg-light-base2 dark:bg-dark-base2">
            <h2 className="mb-5 text-xl font-semibold leading-loose text-light-text1 dark:text-dark-text1">
              Most Ordered
            </h2>
            <hr className="mb-3 dark:border-gray-600" />
            <div className="flex flex-col mb-3 gap-y-4">
              {analytics &&
                analytics.data &&
                analytics.data.topItems.map((item) => (
                  <div key={item.id} className="flex items-center my-3 gap-x-4">
                    {item.imageUrl && item.imageUrl.length > 0 ? (
                      <img
                        className="w-10 h-10 rounded-full"
                        src={item.imageUrl}
                        alt={item.name}
                      />
                    ) : (
                      <img
                        className="w-10 h-10 rounded-full"
                        src={noImg}
                        alt={item.name}
                      />
                    )}

                    <div className="flex flex-col gap-y-0.5">
                      <div className="text-sm font-medium text-slate-700 dark:text-white">
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-700 dark:text-gray-500">
                        {`${item.quantity} dishes ordered`}
                      </div>
                    </div>
                  </div>
                ))}
              {analytics && analytics.data.topItems.length === 0 && (
                <p
                  className="px-6 py-4 text-center text-slate-700 dark:text-gray-500"
                  colSpan={5}
                >
                  No orders have been placed yet.
                </p>
              )}
              {!analytics && (
                <>
                  <div className="my-3 animate-pulse">
                    <div className="flex items-center gap-x-4">
                      <div className="w-10 h-10 rounded-full bg-slate-300 dark:bg-slate-700" />
                      <div className="w-2/3 h-8 rounded bg-slate-300 dark:bg-slate-700" />
                    </div>
                  </div>
                  <div className="my-3 animate-pulse">
                    <div className="flex items-center gap-x-4">
                      <div className="w-10 h-10 rounded-full bg-slate-300 dark:bg-slate-700" />
                      <div className="w-2/3 h-8 rounded bg-slate-300 dark:bg-slate-700" />
                    </div>
                  </div>
                  <div className="my-3 animate-pulse">
                    <div className="flex items-center gap-x-4">
                      <div className="w-10 h-10 rounded-full bg-slate-300 dark:bg-slate-700" />
                      <div className="w-2/3 h-8 rounded bg-slate-300 dark:bg-slate-700" />
                    </div>
                  </div>
                </>
              )}
            </div>
          </Card>
          <Card className="flex flex-col w-1/2 xl:w-full grow bg-light-base2 dark:bg-dark-base2">
            <h2 className="mb-5 text-xl font-semibold leading-loose text-light-text1 dark:text-dark-text1">
              Top Categories
            </h2>
            <hr className="mb-3 dark:border-gray-600" />
            {analytics && analytics.data.topCategories.length === 0 && (
              <p
                className="px-6 py-4 text-center text-slate-700 dark:text-gray-500"
                colSpan={5}
              >
                No orders have been placed yet.
              </p>
            )}
            <div className="flex items-center p-8 grow">
              {analytics && analytics.data?.topCategories.length > 0 && (
                <Doughnut
                  data={{
                    labels: analytics.data.topCategories.map((cat) => cat.name),
                    datasets: [
                      {
                        label: "# of Votes",
                        data: analytics.data.topCategories.map(
                          (cat) => cat.quantity,
                        ),
                        backgroundColor: [
                          "rgba(255, 124, 163, 1)",
                          "rgba(255, 181, 114, 1)",
                          "rgba(101, 176, 246, 1)",
                        ],

                        borderWidth: 2,
                      },
                    ],
                  }}
                />
              )}

              {!analytics && (
                <div className="mx-auto animate-pulse">
                  <div className="w-64 h-64 rounded-full bg-slate-300 dark:bg-slate-700" />
                </div>
              )}
            </div>
          </Card>
        </aside>
      </div>
    </motion.div>
  );
}

export default DashboardAnalytics;
