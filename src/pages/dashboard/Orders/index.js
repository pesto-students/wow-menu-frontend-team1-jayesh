import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import OrderList from "./OrderList";
import OrderDetail from "./OrderDetail";
import useLoadOrders from "./useLoadOrders";
import Filter from "../components/Filter";

function Orders() {
  const firstRenderRef = useRef(true);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [page, setPage] = useState(1);
  const [filterBy, setFilterBy] = useState("");
  const { loading, hasMore, orders } = useLoadOrders(page, filterBy);
  const selectedOrder = orders.find((o) => o.id === selectedOrderId);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const clearSelected = () => {
    setSelectedOrderId(null);
  };
  const handleUpdateFilter = (status) => {
    setFilterBy(status);
    setPage(1);
    clearSelected();
  };
  const updateOrder = (newOrder) => {
    const id = orders.findIndex((order) => order.id === newOrder.id);
    if (id >= 0) orders.splice(id, 1, newOrder);
    setSelectedOrderId(newOrder.id);
  };
  const handleSelectedOrder = (order) => {
    setSelectedOrderId(order.id);
  };

  useEffect(() => {
    if (firstRenderRef.current && orders.length > 0) {
      setSelectedOrderId(orders[0].id);
      firstRenderRef.current = false;
    }
  }, [orders]);

  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="relative w-screen h-screen overflow-hidden bg-light-base1 dark:bg-dark-base1"
    >
      <div className="flex ml-28">
        <main className="relative flex flex-col h-screen pr-4 overflow-x-hidden overflow-y-auto grow">
          <Header name="Orders" />
          <div className="absolute top-4 right-4">
            <Filter
              filterBy={filterBy}
              updateFilter={handleUpdateFilter}
              options={["Pending", "In progress", "Complete"]}
            />
          </div>
          <OrderList
            loading={loading}
            orders={orders}
            hasMore={hasMore}
            onSelected={handleSelectedOrder}
            nextPage={handleNextPage}
          />
        </main>
        {selectedOrder && (
          <OrderDetail
            order={selectedOrder}
            onClose={clearSelected}
            updateOrder={updateOrder}
          />
        )}
      </div>
    </motion.div>
  );
}

export default Orders;
