import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import ListLoader from "../components/ListLoader";
import noOrder from "../../../assets/images/noOrder.svg";
import Card from "../../../shared/components/Card";

const classes = {
  base: "relative grid w-full grid-cols-4 xl:grid-cols-6 lg:grid-cols-5 gap-2 px-3 py-7 text-lg rounded text-light-text1 dark:text-dark-text1 ",
  bg: {
    Pending: "bg-accent-orange/30",
    "In progress": "bg-gray-500/30",
    Complete: "bg-accent-green/30",
  },
  text: {
    Pending: "text-accent-orange",
    "In progress": "text-light-text1 dark:text-dark-text1",
    Complete: "text-accent-green",
  },
};
const statuses = ["Pending", "In progress", "Complete"];

function OrderList({ onSelected, loading, hasMore, orders, nextPage }) {
  const observer = useRef();
  // infinity scroll
  const loadMoreElementRef = useCallback(
    (node) => {
      if (loading) return;
      // the ref is disconnted from the current element
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        // the last item is visible in screen
        if (entries[0].isIntersecting && hasMore) nextPage();
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  return (
    <>
      {orders.length > 0 && (
        <div className="grid grid-cols-4 gap-2 mt-3 mb-5 text-xl font-semibold xl:grid-cols-6 lg:grid-cols-5 text-light-text1 dark:text-dark-text1">
          <p className="hidden lg:block">Order Id</p>
          <p className="hidden text-center xl:block">Ordered At</p>
          <p className="flex justify-center">
            Table <span className="hidden ml-1 lg:block">No.</span>
          </p>
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
                className={`rounded-lg my-2 ${classes.bg[order.status]} `}
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
                  <p className="hidden text-start lg:block">
                    #{order.id.substring(18).toUpperCase()}
                  </p>
                  <p className="hidden text-center xl:block">
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </p>
                  <p className="text-center">{order.tableNo}</p>

                  {order.acceptedBy ? (
                    <p className="col-span-2 text-start">
                      {order.acceptedBy.firstname}
                    </p>
                  ) : (
                    <p className="col-span-2 text-start"> </p>
                  )}
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
        <Card className="flex items-center justify-center my-3 grow bg-light-base2 dark:bg-dark-base2 text-light-text1 dark:text-dark-text2">
          <div>
            <img className="w-64 mx-auto" src={noOrder} alt="No Order" />
            <h3 className="mt-3 text-lg font-medium text-center">
              No Orders yet
            </h3>
          </div>
        </Card>
      )}
    </>
  );
}

export default OrderList;
