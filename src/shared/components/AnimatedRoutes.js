import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageNotFound from "../../pages/404";
import Dashboard from "../../pages/dashboard";
import DashboardAnalytics from "../../pages/dashboard/analytics";
import DashboardHome from "../../pages/dashboard/home";
import DashboardOrders from "../../pages/dashboard/orders";
import DashboardSettings from "../../pages/dashboard/settings";
import MenuUI from "../../pages/menu-ui";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MenuUI />} />
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
