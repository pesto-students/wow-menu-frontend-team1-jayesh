import { BsGearFill } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { FaChartPie } from "react-icons/fa";
import { GiCook } from "react-icons/gi";
import { TiThListOutline } from "react-icons/ti";
import "./Sidebar.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { ReactComponent as StoreIcon } from "../../../assets/icons/store.svg";
import { logout } from "../../../store/reducers/authReducer";
import { resetRestaurant } from "../../../store/reducers/restaurantReducer";
import DashboardSocket from "../../../services/dashboardSocket";
import UserService from "../../../services/user";

function DashboardSideBar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const { userLogout } = UserService();
  const { newOrder } = DashboardSocket();
  const menus = [
    {
      name: "Analytics",
      icon: FaChartPie,
      link: "/dashboard/analytics",
      roles: ["owner"],
      adminAccessRequired: true,
    },
    {
      name: "Orders",
      icon: TiThListOutline,
      link: "/dashboard/orders",
      roles: ["owner", "manager"],
      adminAccessRequired: false,
      badge: true,
    },
    {
      name: "Kitchen",
      icon: GiCook,
      link: "/dashboard/kitchen",
      roles: ["owner", "chef", "manager"],
      adminAccessRequired: false,
    },
    {
      name: "Settings",
      icon: BsGearFill,
      link: "/dashboard/settings",
      roles: ["owner", "manager"],
      adminAccessRequired: false,
    },
    {
      name: "Logout",
      icon: MdLogout,
      roles: ["owner", "chef", "manager"],
      adminAccessRequired: false,
    },
  ];
  const location = useLocation();
  const activeMenu = location.pathname;
  const navigate = useNavigate();
  const [unseenOrder, setUnseenOrder] = useState(0);

  const handleLogout = () => {
    const apiBody = {
      username: user.userDetails.firstname,
    };
    userLogout(apiBody);
    dispatch(logout());
    dispatch(resetRestaurant());
  };
  useEffect(() => {
    if (newOrder && activeMenu !== menus[1].link) {
      setUnseenOrder((lastOrder) => lastOrder + 1);
    }
  }, [newOrder]);

  useEffect(() => {
    if (activeMenu === menus[1].link) {
      setUnseenOrder(0);
    }
  }, [activeMenu]);

  return (
    <div className="fixed z-50 flex flex-col items-center w-24 h-screen py-8 bg-white dark:bg-gray-900 gap-y-4">
      <button
        type="button"
        className="p-2 bg-opacity-20 rounded-xl bg-primary "
      >
        <StoreIcon />
      </button>
      <div className="flex flex-col items-end self-end gap-y-4">
        {menus.map(
          (menu) =>
            (menu.roles?.includes(user.userDetails?.role) ||
              (menu.adminAccessRequired && user.userDetails?.isAdmin)) && (
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
                  className={`relative p-4 my-4 mr-4 ml-3 rounded-xl transition-all duration-100 ease-linear ${
                    activeMenu.indexOf(menu.link) > -1
                      ? "text-white shadow-primary bg-primary"
                      : "text-primary hover:text-white hover:bg-primary"
                  }`}
                  onClick={() => {
                    if (menu.link) {
                      navigate(menu.link);
                    } else {
                      handleLogout();
                    }
                  }}
                >
                  <menu.icon className="w-6 h-6 fill-current" />
                  {menu.badge && unseenOrder > 0 && (
                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold bg-red-500 border-2 border-white rounded-full text-dark-text1 -top-2 -right-2 dark:border-gray-900">
                      {unseenOrder}
                    </div>
                  )}
                </button>
                <span className="sidebar-tooltip group-hover:scale-100">
                  {menu.name}
                </span>
              </div>
            ),
        )}
      </div>
    </div>
  );
}

export default DashboardSideBar;
