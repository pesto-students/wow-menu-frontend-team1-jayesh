import { motion } from "framer-motion";
import Card from "../../../shared/components/Card";
import StatusChip from "../components/StatusChip";

// style for different props
const classes = {
  bg: "bg-light-base2 dark:bg-dark-base2",
  title: "text-light-text1 dark:text-dark-text1 font-medium",
  rejected: "line-through decoration-accent-red decoration-2",
};

function StatusCard({ className, items = [], status }) {
  return (
    <motion.div
      initial={{ x: 30, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      exit={{ x: -30, opacity: 0 }}
    >
      <Card
        className={`
      ${classes.bg}
      ${className}
    `}
      >
        <div className="flex justify-between">
          <div>
            {items.map((item) => {
              return (
                <div className="flex mb-5" key={item.item.id}>
                  <div className="mb-3 ml-2">
                    <h2
                      className={`${classes.title} ${
                        status === "Rejected" ? classes.rejected : ""
                      }`}
                    >
                      <span className="mr-1 text-light-text2 dark:text-dark-text2">{`${item.quantity} x`}</span>
                      {`${item.item.name}`}
                    </h2>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex items-start justify-end">
            <StatusChip status={status}>{status}</StatusChip>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default StatusCard;
