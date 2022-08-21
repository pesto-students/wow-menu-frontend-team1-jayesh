import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import OrderList from "./OrderList";
import OrderDetail from "./OrderDetail";
import useLoadOrders from "./useLoadOrders";

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
    <div className="relative w-screen h-screen overflow-hidden bg-light-base1 dark:bg-dark-base1">
      <div className="flex ml-28">
        <main className="h-screen pr-4 overflow-x-hidden overflow-y-auto grow">
          <Header name="Orders" />
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
    </div>
  );
}

export default Orders;
