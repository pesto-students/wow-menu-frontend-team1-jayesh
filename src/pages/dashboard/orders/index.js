import { motion } from "framer-motion";

function DashboardOrders() {
  return (
    <>
      <motion.main
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col flex-1 gap-6 p-4"
      >
        <header>
          <h1 className="text-3xl font-semibold leading-loose text-slate-800 dark:text-white">
            Orders
          </h1>
          <div className="text-slate-700 dark:text-gray-500">
            {new Date().toDateString()}
          </div>
        </header>
        <hr className="border-gray-700 dark:border-gray-500" />
        <div className="w-full py-3 px-4 bg-white rounded-lg h-[37.5rem] dark:bg-gray-900">
          <h1 className="text-3xl font-semibold leading-loose text-slate-800 dark:text-white">
            #34566
          </h1>
          <hr className="border-gray-700 dark:border-gray-500" />
          <button
            type="button"
            className="py-3.5 rounded-lg w-full text-primary bg-gray-900 dark:bg-primary dark:text-white text-sm font-semibold"
          >
            Mark Complete
          </button>
        </div>
      </motion.main>
      <motion.aside
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col gap-y-6 w-96"
      >
        <div className="flex flex-col h-screen p-6 bg-white dark:bg-gray-900 gap-y-6">
          <div className="flex justify-between font-bold text-white">
            <div>Order Id</div>
            <div>Table No.</div>
            <div>Status</div>
          </div>
          <div>
            <div className="flex justify-between px-2 py-3 bg-[#ffb57233] rounded-lg">
              <div className="text-white">#34568</div>
              <div className="text-white">6</div>
              <div className="text-[#FFB572]">Pending</div>
            </div>
            <div className="flex justify-between px-2 py-3 bg-[#9290fe33] rounded-lg mt-2 relative">
              <div className="absolute inline-flex items-center justify-center w-6 h-6 rounded-full -top-2 -right-2">
                <span className="absolute inline-flex w-full h-full bg-indigo-400 rounded-full opacity-75 animate-ping" />
                <span className="relative inline-flex w-3 h-3 bg-indigo-500 rounded-full" />
              </div>
              {/* <span className="flex w-3 h-3">
              <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-sky-400" />
              <span className="relative inline-flex w-3 h-3 rounded-full bg-sky-500" />
              </span> */}
              <div className="text-white">#34567</div>
              <div className="text-white">8</div>
              <div className="text-[#9290FE]">Pending</div>
            </div>
            <div className="flex justify-between px-2 py-3 bg-[#6be2be3d] rounded-lg mt-2">
              <div className="text-white">#34566</div>
              <div className="text-white">7</div>
              <div className="text-[#50D1AA]">Complete</div>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}

export default DashboardOrders;
