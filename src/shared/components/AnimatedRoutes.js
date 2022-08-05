import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageNotFound from "../../pages/404";
import Dashboard from "../../pages/dashboard";
import DashboardAnalytics from "../../pages/dashboard/analytics";
import DashboardHome from "../../pages/dashboard/home";
import DashboardOrders from "../../pages/dashboard/orders";
import DashboardSettings from "../../pages/dashboard/settings";
import CustomerMenu from "../../pages/menu-ui/HomePage";
import CustomerOrder from "../../pages/menu-ui/OrderPage";
import CustomerOrderStatus from "../../pages/menu-ui/StatusPage";
import CustomerBillPage from "../../pages/menu-ui/BillPage";
import CustomerSearchPage from "../../pages/menu-ui/SearchPage";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<CustomerMenu />} />
        <Route path="/order" element={<CustomerOrder />} />
        <Route path="/status" element={<CustomerOrderStatus />} />
        <Route path="/bill" element={<CustomerBillPage />} />
        <Route path="/search" element={<CustomerSearchPage />} />
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="home" element={<DashboardHome />} />
          <Route path="orders" element={<DashboardOrders />} />
          <Route path="analytics" element={<DashboardAnalytics />} />
          <Route path="settings" element={<DashboardSettings />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
