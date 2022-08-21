/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import useLoadOrders from "./useLoadOrders";
import OrderList from "./OrderList";
import OrderDetail from "./OrderDetail";

function Orders() {
  const firstRenderRef = useRef(true);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [page, setPage] = useState(1);
  const { loading, hasMore, orders } = useLoadOrders(page);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const updateOrder = (newOrder) => {
    const id = orders.findIndex((order) => order.id === newOrder.id);
    orders.splice(id, 1, newOrder);
    setSelectedOrder(newOrder);
  };
  const handleSelectedOrder = (order) => {
    setSelectedOrder(order);
  };
  const clearSelected = () => {
    setSelectedOrder(null);
  };

  useEffect(() => {
    if (firstRenderRef.current && orders.length > 0) {
      setSelectedOrder(orders[0]);
      firstRenderRef.current = false;
    }
  }, [orders]);

  return (
    <div className="w-screen overflow-hidden bg-light-base1 dark:bg-dark-base1">
      <div className="flex h-screen ml-28">
        <main className="flex flex-col h-full mr-4 grow">
          <Header name="Kitchen" />
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

export default Orders;
