import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";
import { RiEditCircleFill } from "react-icons/ri";
import useAxios from "../../../../../shared/hooks/useAxios";
import UserListSkeleton from "./UserListSkeleton";

export default function UsersList() {
  const { response, loading, error } = useAxios({
    url: "/users?",
    method: "get",
    headers: { accept: "*/*" },
  });
  const [usersData, setUsersData] = useState([]);
  const navigate = useNavigate();
  const notify = () => {
    navigate("../settings/access-management/add");
  };

  useEffect(() => {
    if (response !== null) {
      setUsersData(response);
    }
  }, [response]);
  return (
    <div className="flex flex-col flex-1 p-4 pl-28">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold leading-loose text-slate-800 dark:text-white">
          Users
        </h2>
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
        className="px-3.5 py-2 w-max ml-auto my-3 rounded-lg border border-primary text-white bg-primary dark:bg-gray-900 dark:text-primary text-sm font-semibold flex"
      >
        <AiOutlineUserAdd size={20} className="mr-2" /> Add New User
      </button>
      <div className="mt-2 overflow-x-auto">
        {loading ? (
          <UserListSkeleton />
        ) : (
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-auto">
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
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium whitespace-nowrap"
                        >
                          {val.firstname.charAt(0).toUpperCase() +
                            val.firstname.slice(1)}{" "}
                          {val.lastname.charAt(0).toUpperCase() +
                            val.lastname.slice(1)}
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
                              <RiEditCircleFill
                                size={25}
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
    </div>
  );
}
