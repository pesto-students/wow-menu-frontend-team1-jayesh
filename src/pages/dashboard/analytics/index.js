import { useEffect } from "react";
import { BiFoodMenu } from "react-icons/bi";
import { GiHotMeal } from "react-icons/gi";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Header from "../components/Header";
import AnalyticService from "../../../services/analytics";
import BillService from "../../../services/dashboardBill";
import FeatureCard from "./FeatureCard";
import Card from "../../../shared/components/Card";

ChartJS.register(ArcElement, Tooltip, Legend);
function DashboardAnalytics() {
  const { response: analytics, getAnalytics } = AnalyticService();
  const { response: bills, getBills } = BillService();
  useEffect(() => {
    getAnalytics();
    getBills();
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-x-hidden bg-light-base1 dark:bg-dark-base1">
      <div className="flex flex-wrap ml-28">
        <main className="relative flex flex-col h-screen gap-4 pr-4 overflow-x-hidden overflow-y-auto grow">
          <Header name="Analytics" />
          {analytics && analytics.data && (
            <div className="grid gap-4 sm:grid-cols-3">
              <FeatureCard
                icon={<HiOutlineCurrencyRupee className="text-accent-violet" />}
                title={analytics.data.totalRevenue}
                subtitle="Total Revenue"
              />
              <FeatureCard
                icon={<GiHotMeal className="text-accent-red" />}
                title={analytics.data.totalQuantity}
                subtitle="Items Ordered"
              />
              <FeatureCard
                icon={<BiFoodMenu className="text-primary" />}
                title={analytics.data.ordersCount}
                subtitle="Total Orders"
              />
            </div>
          )}
          <Card className="mb-4 grow bg-light-base2 dark:bg-dark-base2">
            <h2 className="mb-5 text-xl font-semibold leading-loose text-light-text1 dark:text-dark-text1">
              Billing Report
            </h2>
            <div className="grid grid-cols-5 gap-2 my-3 text-lg font-medium text-light-text1 dark:text-dark-text1">
              <p>Bill Id</p>
              <p className="text-end">Subtotal</p>
              <p className="text-end">GST</p>
              <p className="text-end">Total</p>
              <p className="text-center">Payment Mode</p>
            </div>
            <hr className="dark:border-gray-600" />
            {bills &&
              bills.data &&
              bills.data.map((bill) => {
                return (
                  <div className="grid grid-cols-5 gap-2 my-5 text-light-text1 dark:text-dark-text2">
                    <p>#{bill.id.substring(18).toUpperCase()}</p>
                    <p className="text-end">
                      {parseFloat(bill.subtotal).toFixed(2)}
                    </p>

                    <p className="text-end">
                      {parseFloat(bill.cgst + bill.sgst).toFixed(2)}
                    </p>
                    <p className="text-end">
                      {parseFloat(bill.total).toFixed(2)}
                    </p>
                    <p className="text-center">
                      {bill.paymentMode && bill.paymentMode === "Online"
                        ? "Online"
                        : "Cash"}
                    </p>
                  </div>
                );
              })}
          </Card>
        </main>
        <aside className="flex flex-col w-full py-4 pr-4 gap-y-4 lg:w-96">
          <Card className="bg-light-base2 dark:bg-dark-base2">
            <h2 className="mb-5 text-xl font-semibold leading-loose text-light-text1 dark:text-dark-text1">
              Billing Report
            </h2>
            <hr className="mb-3 dark:border-gray-600" />
            <div className="flex flex-col mb-3 gap-y-4">
              {analytics &&
                analytics.data &&
                analytics.data.topItems.map((item) => (
                  <div key={item.id} className="flex items-center my-3 gap-x-4">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={item.imageUrl}
                      alt={item.name}
                    />
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
            </div>
          </Card>
          <Card className="flex flex-col grow bg-light-base2 dark:bg-dark-base2">
            <h2 className="mb-5 text-xl font-semibold leading-loose text-light-text1 dark:text-dark-text1">
              Top Categories
            </h2>
            <hr className="mb-3 dark:border-gray-600" />
            <div className="flex items-center grow">
              {analytics && analytics.data && (
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
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}

export default DashboardAnalytics;
