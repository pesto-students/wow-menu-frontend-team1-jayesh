import { BsGearFill } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { FaChartPie, FaHome } from "react-icons/fa";
import { GiCook } from "react-icons/gi";
import { TiThListOutline } from "react-icons/ti";
import "./Sidebar.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ReactComponent as StoreIcon } from "../../../assets/icons/store.svg";
import { logout } from "../../../store/reducers/authReducer";
import { resetRestaurant } from "../../../store/reducers/restaurantReducer";

function DashboardSideBar() {
  const dispatch = useDispatch();
  const menus = [
    { name: "Home", icon: FaHome, link: "/dashboard/home" },
    { name: "Orders", icon: TiThListOutline, link: "/dashboard/orders" },
    { name: "Kitchen", icon: GiCook, link: "/dashboard/kitchen" },
    { name: "Analytics", icon: FaChartPie, link: "/dashboard/analytics" },
    { name: "Settings", icon: BsGearFill, link: "/dashboard/settings" },
    { name: "Logout", icon: MdLogout },
  ];

  const location = useLocation();
  const activeMenu = location.pathname;
  const navigate = useNavigate();

  return (
    <div className="fixed z-50 flex flex-col items-center w-24 h-screen py-8 bg-white dark:bg-gray-900 gap-y-4">
      <button
        type="button"
        className="p-2 bg-opacity-20 rounded-xl bg-primary "
      >
        <StoreIcon />
      </button>
      <div className="flex flex-col items-end self-end gap-y-4">
        {menus.map((menu) => (
          <div
            key={menu.name}
            className={
              activeMenu.indexOf(menu.link) > -1
                ? `bg-primary_light dark:bg-gray-800 rounded-l-xl relative 
                      before:absolute before:w-4 before:h-8 before:-top-8 before:rounded-br-xl before:right-0 before:shadow-inverse-top dark:before:shadow-inverse-top-dark 
                      after:absolute after:w-4 after:h-8 after:-bottom-8 after:rounded-tr-xl after:right-0 after:shadow-inverse-bottom dark:after:shadow-inverse-bottom-dark`
                : "group"
            }
          >
            <button
              type="button"
              className={`p-4 my-4 mr-4 ml-3 rounded-xl transition-all duration-100 ease-linear ${
                activeMenu.indexOf(menu.link) > -1
                  ? "text-white shadow-primary bg-primary"
                  : "text-primary hover:text-white hover:bg-primary"
              }`}
              onClick={() => {
                if (menu.link) {
                  navigate(menu.link);
                } else {
                  dispatch(logout());
                  dispatch(resetRestaurant());
                }
              }}
            >
              <menu.icon className="w-6 h-6 fill-current" />
            </button>
            <span className="sidebar-tooltip group-hover:scale-100">
              {menu.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardSideBar;
