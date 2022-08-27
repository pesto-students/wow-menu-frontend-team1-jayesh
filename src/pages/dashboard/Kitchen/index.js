import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import useLoadOrders from "./useLoadOrders";
import OrderList from "./OrderList";
import OrderDetail from "./OrderDetail";
import Filter from "../components/Filter";

export default function Kitchen() {
  const firstRenderRef = useRef(true);
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
    if (firstRenderRef.current && orders.length > 0) {
      setSelectedOrderId(orders[0].id);
      firstRenderRef.current = false;
    }
  }, [orders]);

  return (
    <div className="w-screen overflow-hidden bg-light-base1 dark:bg-dark-base1">
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
        </main>
        <OrderList
          loading={loading}
          orders={orders}
          hasMore={hasMore}
          onSelected={handleSelectedOrder}
          nextPage={handleNextPage}
        />
      </div>
    </div>
  );
}
