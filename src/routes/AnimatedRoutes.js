import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageNotFound from "../pages/404";
import DashboardAnalytics from "../pages/dashboard/analytics";
import DashboardOrders from "../pages/dashboard/Orders";
import DashboardSettings from "../pages/dashboard/settings";
import Customer from "../pages/customer";
import SplashScreen from "../pages/customer/SplashScreen";
import CustomerMenu from "../pages/customer/HomePage";
import CustomerOrder from "../pages/customer/OrderPage";
import CustomerOrderStatus from "../pages/customer/StatusPage";
import CustomerBillPage from "../pages/customer/BillPage";
import CustomerSearchPage from "../pages/customer/SearchPage";
import DashboardKitchen from "../pages/dashboard/Kitchen";
import Dashboard from "../pages/dashboard";
import Signup from "../pages/signup";
import Login from "../pages/login";
import QRCode from "../pages/dashboard/settings/QRCode";
import ProductsList from "../pages/dashboard/settings/ProductsManagement/ProductsList";
import EditProduct from "../pages/dashboard/settings/ProductsManagement/EditProduct";
import AddProduct from "../pages/dashboard/settings/ProductsManagement/AddProduct";
import CategoriesList from "../pages/dashboard/settings/CategoriesManagement/CategoriesList";
import AddCategory from "../pages/dashboard/settings/CategoriesManagement/AddCategory";
import EditCategory from "../pages/dashboard/settings/CategoriesManagement/EditCategory";
import UsersList from "../pages/dashboard/settings/AccessManagement/UsersList";
import AddUser from "../pages/dashboard/settings/AccessManagement/AddUser";
import EditUser from "../pages/dashboard/settings/AccessManagement/EditUser";
import ProtectedRoute from "./ProtectedRoute";
import RestaurantDeatils from "../pages/dashboard/settings/RestaurantDetails";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Customer />}>
          <Route path="" element={<SplashScreen />} />
          <Route path=":restaurantId/:table" element={<SplashScreen />} />
          <Route path="home" element={<CustomerMenu />} />
          <Route path="order" element={<CustomerOrder />} />
          <Route path="status" element={<CustomerOrderStatus />} />
          <Route path="bill" element={<CustomerBillPage />} />
          <Route path="search" element={<CustomerSearchPage />} />
        </Route>
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />}>
            <Route path="orders" element={<DashboardOrders />} />
            <Route path="kitchen" element={<DashboardKitchen />} />
            <Route path="analytics" element={<DashboardAnalytics />} />
            <Route path="settings" element={<DashboardSettings />} />
            <Route path="settings/qrcode" element={<QRCode />} />
            <Route path="settings/access-management" element={<UsersList />} />
            <Route
              path="settings/access-management/add"
              element={<AddUser />}
            />
            <Route
              path="settings/access-management/edit/:id"
              element={<EditUser />}
            />
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
            <Route path="settings/restaurant" element={<RestaurantDeatils />} />
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;