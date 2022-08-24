import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageNotFound from "../../pages/404";
import DashboardAnalytics from "../../pages/dashboard/analytics";
import DashboardHome from "../../pages/dashboard/home";
// import DashboardOrders from "../../pages/dashboard/Orders";
import DashboardSettings from "../../pages/dashboard/settings";
import SplashScreen from "../../pages/menu-ui";
import CustomerMenu from "../../pages/menu-ui/HomePage";
import CustomerOrder from "../../pages/menu-ui/OrderPage";
import CustomerOrderStatus from "../../pages/menu-ui/StatusPage";
import CustomerBillPage from "../../pages/menu-ui/BillPage";
import CustomerSearchPage from "../../pages/menu-ui/SearchPage";
// import DashboardKitchen from "../../pages/dashboard/Kitchen";
import Dashboard from "../../pages/dashboard";
import Signup from "../../pages/signup";
import Login from "../../pages/login";
import AccessManagement from "../../pages/dashboard/settings/AccessManagement";
import QRCode from "../../pages/dashboard/settings/QRCode";
import ProductsList from "../../pages/dashboard/settings/ProductsManagement/ProductsList";
import EditProduct from "../../pages/dashboard/settings/ProductsManagement/EditProduct";
import AddProduct from "../../pages/dashboard/settings/ProductsManagement/AddProduct";
import CategoriesList from "../../pages/dashboard/settings/CategoriesManagement/CategoriesList";
import AddCategory from "../../pages/dashboard/settings/CategoriesManagement/AddCategory";
import EditCategory from "../../pages/dashboard/settings/CategoriesManagement/EditCategory";
import ProtectedRoute from "./ProtectedRoute";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/home" element={<CustomerMenu />} />
        <Route path="/order" element={<CustomerOrder />} />
        <Route path="/status" element={<CustomerOrderStatus />} />
        <Route path="/bill" element={<CustomerBillPage />} />
        <Route path="/search" element={<CustomerSearchPage />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />}>
            <Route path="home" element={<DashboardHome />} />
            {/* <Route path="orders" element={<DashboardOrders />} /> */}
            {/* <Route path="kitchen" element={<DashboardKitchen />} /> */}
            <Route path="analytics" element={<DashboardAnalytics />} />
            <Route path="settings" element={<DashboardSettings />} />
            <Route
              path="settings/access-management"
              element={<AccessManagement />}
            />
            <Route path="settings/qrcode" element={<QRCode />} />
            <Route
              path="settings/categories-list"
              element={<CategoriesList />}
            />
            <Route path="settings/add-category" element={<AddCategory />} />
            <Route
              path="settings/edit-category/:id"
              element={<EditCategory />}
            />
            <Route path="settings/products-list" element={<ProductsList />} />
            <Route path="settings/add-product" element={<AddProduct />} />
            <Route path="settings/edit-product/:id" element={<EditProduct />} />
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
