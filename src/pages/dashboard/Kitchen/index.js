import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import useLoadOrders from "./useLoadOrders";
import OrderList from "./OrderList";
import OrderDetail from "./OrderDetail";
import Filter from "../components/Filter";
import ListLoader from "../components/ListLoader";
import noOrder from "../../../assets/images/noOrder.svg";

export default function Kitchen() {
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [page, setPage] = useState(1);
  const [filterBy, setFilterBy] = useState("");
  const { loading, hasMore, orders } = useLoadOrders(page, filterBy);
  const selectedOrder = orders.find((o) => o.id === selectedOrderId);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const handleUpdateFilter = (status) => {
    setFilterBy(status);
    setPage(1);
  };
  const updateOrder = (newOrder) => {
    const id = orders.findIndex((order) => order.id === newOrder.id);
    orders.splice(id, 1, newOrder);
    setSelectedOrderId(newOrder.id);
  };
  const handleSelectedOrder = (order) => {
    setSelectedOrderId(order.id);
  };
  const clearSelected = () => {
    setSelectedOrderId(null);
  };

  useEffect(() => {
    if (orders && orders.length > 0 && orders[0].id) {
      setSelectedOrderId(orders[0].id);
    } else {
      setSelectedOrderId(null);
    }
  }, [orders]);
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="w-screen overflow-hidden bg-light-base1 dark:bg-dark-base1"
    >
      <div className="flex h-screen ml-28">
        <main className="relative flex flex-col h-full mr-4 overflow-x-hidden grow">
          <Header name="Kitchen" />
          <div className="absolute top-4 right-4">
            <Filter
              filterBy={filterBy}
              updateFilter={handleUpdateFilter}
              options={["In progress", "Complete"]}
            />
          </div>
          {selectedOrder && (
            <OrderDetail
              order={selectedOrder}
              onClose={clearSelected}
              updateOrder={updateOrder}
            />
          )}
          {!loading && orders.length === 0 && (
            <div className="flex items-center justify-center h-full text-light-text1 dark:text-dark-text2">
              <div>
                <img className="w-48 mx-auto" src={noOrder} alt="No Order" />
                <h3 className="mt-3 text-lg font-medium text-center">
                  No Orders to Display
                </h3>
              </div>
            </div>
          )}
          {loading && !selectedOrderId && (
            <div className="h-full text-light-text1 dark:text-dark-text2">
              <ListLoader />
              <ListLoader />
              <ListLoader />
            </div>
          )}
        </main>
        {orders.length > 0 && (
          <OrderList
            loading={loading}
            orders={orders}
            hasMore={hasMore}
            onSelected={handleSelectedOrder}
            nextPage={handleNextPage}
          />
        )}
      </div>
    </motion.div>
  );
}
