import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import UserListSkeleton from "./UserListSkeleton";
import BackButton from "../../../../../shared/components/BackButton";
import UserService from "../../../../../services/user";

export default function UsersList() {
  const { response, loading, error, getUsers } = UserService();
  const restaurantId = useSelector((state) => state.restaurant.details.id);
  const [usersData, setUsersData] = useState([]);
  const navigate = useNavigate();
  const notify = () => {
    navigate("../settings/access-management/add");
  };
  useEffect(() => {
    getUsers();
  }, []);
  useEffect(() => {
    if (response && restaurantId) {
      setUsersData(response);
    }
  }, [response, restaurantId]);
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col flex-1 p-4 pl-28"
    >
      <div className="flex items-center justify-start mb-3">
        <BackButton href="/dashboard/settings" />

        <h3 className="ml-2 text-2xl font-semibold leading-loose text-slate-800 dark:text-white">
          Users
        </h3>
      </div>
      <nav className="w-full mb-3">
        <ol className="flex">
          <li>
            <Link
              to="/dashboard/settings"
              className="hover:text-primary dark:text-white"
            >
              Settings
            </Link>
          </li>
          <li>
            <span className="mx-2 text-gray-500">/</span>
          </li>
          <li className="text-gray-500">Users List</li>
        </ol>
      </nav>
      <hr className="border-gray-700 dark:border-gray-600" />
      <button
        type="button"
        onClick={notify}
        className="px-3.5 py-2 w-max ml-auto my-3 rounded border border-dashed border-primary text-white bg-primary dark:bg-gray-900 dark:text-primary text-sm font-semibold flex"
      >
        <AiOutlineUserAdd size={20} className="mr-2" /> Add New User
      </button>
      <div className="mt-2 overflow-x-auto">
        {loading ? (
          <UserListSkeleton />
        ) : (
          <table className="w-full text-sm text-left text-gray-500 table-auto dark:text-gray-400">
            <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Username
                </th>
                <th scope="col" className="px-6 py-3">
                  Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Admin Access
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {error && <p>{error.message}</p>}
              {usersData.data &&
                usersData.data.map((val) => {
                  return (
                    val.role.toLowerCase() !== "owner" && (
                      <tr
                        key={val.id}
                        className="text-gray-900 bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium whitespace-nowrap"
                        >
                          {val.firstname} {val.lastname}
                        </th>
                        <td className="px-6 py-4">{val.username}</td>
                        <td className="px-6 py-4">
                          {val.role.charAt(0).toUpperCase() + val.role.slice(1)}
                        </td>
                        <td className="px-6 py-4">
                          {val.isAdmin ? "Yes" : "No"}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex text-primary justify-left">
                            <span // eslint-disable-line
                              onClick={() =>
                                navigate(
                                  `/dashboard/settings/access-management/edit/${val.id}`,
                                )
                              }
                            >
                              <FaRegEdit
                                size={20}
                                title="Edit"
                                className="mx-1 cursor-pointer"
                              />
                            </span>
                          </div>
                        </td>
                      </tr>
                    )
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
    </motion.div>
  );
}
