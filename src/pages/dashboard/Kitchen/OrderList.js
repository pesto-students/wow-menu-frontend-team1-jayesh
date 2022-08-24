import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import ListLoader from "../components/ListLoader";
import noOrder from "../../../assets/images/noOrder.svg";
import Card from "../../menu-ui/components/Card";

const classes = {
  base: "relative grid w-full grid-cols-3 gap-2 px-3 py-5 text-lg my-7 text-light-text1 dark:text-dark-text1",
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
const statuses = ["Incomplete", "Complete"];
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
    <aside className="h-screen p-6 overflow-y-scroll w-96 bg-light-base2 dark:bg-dark-base2">
      {loading && (
        <>
          <ListLoader />
          <ListLoader />
          <ListLoader />
        </>
      )}
      {orders.length > 0 && (
        <div className="grid grid-cols-3 gap-2 my-3 text-xl font-semibold text-light-text1 dark:text-dark-text1">
          <p className="text-start">Order Id</p>
          <p className="text-center">Table No.</p>
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
                  <p className="text-start">
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
      {orders.length === 0 && (
        <Card className="my-3 bg-light-base2 dark:bg-dark-base2 text-light-text1 dark:text-dark-text2">
          <img className="w-48 mx-auto" src={noOrder} alt="No Order" />
          <h3 className="mt-3 text-lg font-medium text-center">
            No Orders yet
          </h3>
        </Card>
      )}
    </aside>
  );
}

export default OrderList;