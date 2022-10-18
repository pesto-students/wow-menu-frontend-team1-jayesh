import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import ListLoader from "../components/ListLoader";
import noOrder from "../../../assets/images/noOrder.svg";

const classes = {
  base: "relative grid w-full grid-cols-2 md:grid-cols-3 gap-2 px-3 py-5 text-lg my-4 text-light-text1 dark:text-dark-text1",
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
const statuses = ["In progress", "Complete"];

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
    <aside className="w-64 min-w-[16rem] h-screen p-2 overflow-x-hidden overflow-y-auto md:p-6 md:w-96 md:min-w-[24rem] bg-light-base2 dark:bg-dark-base2">
      {orders.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mt-3 mb-5 text-xl font-semibold md:grid-cols-3 text-light-text1 dark:text-dark-text1">
          <p className="hidden md:block">Order Id</p>
          <p className="flex justify-center">
            Table <span className="hidden ml-1 md:block">No.</span>
          </p>
          <p className="text-end">Status</p>
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
                className={`rounded-lg ${classes.bg[order.status]} `}
              >
                <button
                  ref={orders.length === idx + 1 ? loadMoreElementRef : null}
                  type="button"
                  onClick={() => {
                    onSelected(order);
                  }}
                  className={`${classes.base}`}
                >
                  <p className="hidden text-start md:block">
                    #{order.id.substring(18).toUpperCase()}
                  </p>
                  <p className="text-center">{order.tableNo}</p>
                  <p
                    className={`text-end font-semibold ${
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
          <ListLoader />
        </>
      )}
      {!loading && orders.length === 0 && (
        <div className="flex items-center justify-center h-full bg-light-base2 dark:bg-dark-base2 text-light-text1 dark:text-dark-text2">
          <div>
            <img className="w-48 mx-auto" src={noOrder} alt="No Order" />
            <h3 className="mt-3 text-lg font-medium text-center">
              No Orders yet
            </h3>
          </div>
        </div>
      )}
    </aside>
  );
}

export default OrderList;
