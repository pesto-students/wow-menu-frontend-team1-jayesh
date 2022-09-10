import { motion } from "framer-motion";
import { MdQrCode2 } from "react-icons/md";
import { TbDiscount2 } from "react-icons/tb";
import { BsInfoCircle } from "react-icons/bs"; // BsShieldLock,
import { BiCategoryAlt } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import UserAndTheme from "../components/UserAndTheme";

function DashboardSettings() {
  const user = useSelector((state) => state.auth.user);
  const settingsOptions = [
    {
      id: 1,
      icon: <BsInfoCircle />,
      title: "Restaurant Details",
      subtitle: "Manage your restaurant details",
      link: "restaurant",
      adminAccessRequired: true,
    },
    {
      id: 2,
      icon: <FaRegUser />,
      title: "Access Management",
      subtitle: "Roles and Permissions",
      link: "access-management",
      adminAccessRequired: true,
    },
    {
      id: 3,
      icon: <BiCategoryAlt />,
      title: "Categories Management",
      subtitle: "Manage your categories",
      link: "categories-list",
      adminAccessRequired: false,
    },
    {
      id: 4,
      icon: <TbDiscount2 />,
      title: "Products Management",
      subtitle: "Manage your products, pricing etc",
      link: "products-list",
      adminAccessRequired: false,
    },
    {
      id: 5,
      icon: <MdQrCode2 />,
      title: "QR Code",
      subtitle: "Share, Download QR Code",
      link: "qrcode",
      adminAccessRequired: false,
    },
  ];
  return (
    <motion.main
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col flex-1 gap-6 p-4 pl-28"
    >
      <header className="flex justify-between">
        <h1 className="text-3xl font-semibold leading-loose text-slate-800 dark:text-white">
          Settings
        </h1>
        <UserAndTheme />
      </header>
      <hr className="border-gray-700 dark:border-gray-600" />
      <div className="flex flex-col pr-3">
        <div className="flex flex-col content-start w-full py-4 mr-4 bg-white rounded-lg h-max dark:bg-gray-900 gap-y-6">
          {settingsOptions.map(
            (element) =>
              // return (
              (!element.adminAccessRequired ||
                (element.adminAccessRequired && user.userDetails?.isAdmin)) && (
                <Link
                  key={element.id}
                  to={`/dashboard/settings/${element.link}`}
                >
                  <div
                    key={element.id}
                    className="flex w-full px-6 py-2 cursor-pointer hover:bg-[#ea7c6970]"
                  >
                    <span className="flex pt-[5px] text-lg text-slate-800 dark:text-white">
                      {element.icon}
                    </span>
                    <div className="ml-3">
                      <span className="flex text-lg text-slate-800 dark:text-white">
                        {element.title}
                      </span>
                      <span className="text-sm text-slate-700 dark:text-slate-400">
                        {element.subtitle}
                      </span>
                    </div>
                  </div>
                </Link>
              ),
          )}
        </div>
      </div>
    </motion.main>
  );
}

export default DashboardSettings;
