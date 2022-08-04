import { useSelector } from "react-redux";
import PageHeader from "../components/PageHeader";
import CallWaiter from "../HomePage/CallWaiter";
import StatusCard from "./StatusCard";
import Card from "../components/Card";

function StatusPage() {
  const orders = useSelector((state) => state.order.list);
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-light-base1 dark:bg-dark-base1">
      <div className="h-full p-4 overflow-y-auto bg-lightPattern">
        <PageHeader name="Order Status" />
        <div className="mt-5">
          {orders.map((order) => {
            return (
              <StatusCard
                key={order.id}
                className="my-3"
                status={order.status}
                items={order.items}
              />
            );
          })}
          {orders.length === 0 && (
            <Card className="bg-light-base2 dark:bg-dark-base2">
              <h2 className="mb-3 font-medium text-center text-light-text1 dark:text-dark-text1">
                Nothing ordered yet.
              </h2>
              <h2 className="font-medium text-center text-light-text1 dark:text-dark-text1">
                Please order something!!!
              </h2>
            </Card>
          )}
        </div>
      </div>
      <CallWaiter />
    </div>
  );
}

export default StatusPage;
