import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import ListLoader from "../components/ListLoader";
import noOrder from "../../../assets/images/noOrder.svg";
import Card from "../../../shared/components/Card";

const classes = {
  base: "relative grid w-full grid-cols-7 gap-2 px-3 py-5 text-lg rounded my-7 text-light-text1 dark:text-dark-text1 ",
  bg: {
    Pending: "bg-accent-orange/30",
    Incomplete: "bg-gray-500/30",
    Complete: "bg-accent-green/30",
  },
  text: {
    Pending: "text-accent-orange",
    Incomplete: "text-light-text1 dark:text-dark-text1",
    Complete: "text-accent-green",
  },
};
const statuses = ["Pending", "Incomplete", "Complete"];

function OrderList({ onSelected, loading, hasMore, orders, nextPage }) {
  const observer = useRef();
  const loadMoreElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) nextPage();
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  return (
    <>
      {orders.length > 0 && (
        <div className="grid grid-cols-7 gap-2 my-3 text-xl font-semibold text-light-text1 dark:text-dark-text1">
          <p className="col-span-2">Order Id</p>
          <p className="text-center">Ordered At</p>
          <p className="text-center">Table No.</p>
          <p className="col-span-2">Managed By</p>
          <p className="text-center">Status</p>
        </div>
      )}
      {orders.length > 0 &&
        orders
          .sort(
            (o1, o2) =>
              statuses.indexOf(o1.status) - statuses.indexOf(o2.status),
          )
          .map((order, idx) => {
            return (
              <motion.div
                initial={{ x: 30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
                viewport={{ once: true }}
                exit={{ x: -30, opacity: 0 }}
                key={order.id}
                className={`${classes.bg[order.status]} `}
              >
                <button
                  ref={orders.length === idx + 1 ? loadMoreElementRef : null}
                  type="button"
                  onClick={() => {
                    onSelected(order);
                  }}
                  className={`${classes.base}`}
                >
                  {order.status === "Pending" && (
                    <span className="absolute inline-flex items-center justify-center w-6 h-6 rounded-full -top-2 -right-2">
                      <span className="absolute inline-flex w-full h-full rounded-full opacity-75 bg-accent-orange animate-ping" />
                      <span className="relative inline-flex w-3 h-3 rounded-full bg-accent-orange" />
                    </span>
                  )}
                  <p className="col-span-2 text-start">
                    #{order.id.substring(18).toUpperCase()}
                  </p>
                  <p className="text-center">
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </p>
                  <p className="text-center">{order.tableNo}</p>
                  <p className="col-span-2 text-start">Admin</p>
                  <p
                    className={`text-center font-semibold ${
                      classes.text[order.status]
                    }`}
                  >
                    {order.status}
                  </p>
                </button>
              </motion.div>
            );
          })}
      {loading && (
        <>
          <ListLoader />
          <ListLoader />
        </>
      )}
      {!loading && orders.length === 0 && (
        <Card className="my-3 bg-light-base2 dark:bg-dark-base2 text-light-text1 dark:text-dark-text2">
          <img className="w-48 mx-auto" src={noOrder} alt="No Order" />
          <h3 className="mt-3 text-lg font-medium text-center">
            No Orders yet
          </h3>
        </Card>
      )}
    </>
  );
}

export default OrderList;
