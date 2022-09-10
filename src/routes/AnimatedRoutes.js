import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ProtectedRoute from "./ProtectedRoute";
import FallbackUI from "../pages/FallbackUI";

const PageNotFound = lazy(() => import("../pages/404"));
const DashboardAnalytics = lazy(() => import("../pages/dashboard/analytics"));
const DashboardOrders = lazy(() => import("../pages/dashboard/Orders"));
const DashboardSettings = lazy(() => import("../pages/dashboard/settings"));
const Customer = lazy(() => import("../pages/customer"));
const SplashScreen = lazy(() => import("../pages/customer/SplashScreen"));
const CustomerMenu = lazy(() => import("../pages/customer/HomePage"));
const CustomerOrder = lazy(() => import("../pages/customer/OrderPage"));
const CustomerOrderStatus = lazy(() => import("../pages/customer/StatusPage"));
const CustomerBillPage = lazy(() => import("../pages/customer/BillPage"));
const CustomerSearchPage = lazy(() => import("../pages/customer/SearchPage"));
const DashboardKitchen = lazy(() => import("../pages/dashboard/Kitchen"));
const Dashboard = lazy(() => import("../pages/dashboard"));
const Signup = lazy(() => import("../pages/signup"));
const Login = lazy(() => import("../pages/login"));
const QRCode = lazy(() => import("../pages/dashboard/settings/QRCode"));
const ProductsList = lazy(() =>
  import("../pages/dashboard/settings/ProductsManagement/ProductsList"),
);
const EditProduct = lazy(() =>
  import("../pages/dashboard/settings/ProductsManagement/EditProduct"),
);
const AddProduct = lazy(() =>
  import("../pages/dashboard/settings/ProductsManagement/AddProduct"),
);
const CategoriesList = lazy(() =>
  import("../pages/dashboard/settings/CategoriesManagement/CategoriesList"),
);
const AddCategory = lazy(() =>
  import("../pages/dashboard/settings/CategoriesManagement/AddCategory"),
);
const EditCategory = lazy(() =>
  import("../pages/dashboard/settings/CategoriesManagement/EditCategory"),
);
const UsersList = lazy(() =>
  import("../pages/dashboard/settings/AccessManagement/UsersList"),
);
const AddUser = lazy(() =>
  import("../pages/dashboard/settings/AccessManagement/AddUser"),
);
const EditUser = lazy(() =>
  import("../pages/dashboard/settings/AccessManagement/EditUser"),
);
const RestaurantDeatils = lazy(() =>
  import("../pages/dashboard/settings/RestaurantDetails"),
);

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <Suspense fallback={<FallbackUI />}>
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
              <Route
                path="settings/access-management"
                element={<UsersList />}
              />
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
              <Route
                path="settings/edit-product/:id"
                element={<EditProduct />}
              />
              <Route
                path="settings/restaurant"
                element={<RestaurantDeatils />}
              />
            </Route>
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}

export default AnimatedRoutes;
