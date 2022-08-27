import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import useAxios from "../../../../../shared/hooks/useAxios";
import CategoryCardSkeleton from "./CategoryCardSkeleton";

function CategoriesList() {
  const { response, loading, error } = useAxios({
    url: "/categories?",
    method: "get",
    headers: { accept: "*/*" },
  });
  const [categoriesData, setCategoriesData] = useState([]);
  const navigate = useNavigate();
  const notify = () => {
    navigate("../settings/add-category");
  };

  useEffect(() => {
    if (response !== null) {
      setCategoriesData(response);
    }
  }, [response]);

  return (
    <div className="flex flex-col flex-1 p-4 pl-28">
      <div className="flex justify-between mb-3">
        <h3 className="text-2xl font-semibold leading-loose text-slate-800 dark:text-white">
          Categories List
        </h3>
      </div>
      <nav className="w-full mb-3">
        <ol className="flex">
          <li>
            <Link
              to="/dashboard/settings"
              className="text-white hover:text-primary"
            >
              Settings
            </Link>
          </li>
          <li>
            <span className="mx-2 text-gray-500">/</span>
          </li>
          <li className="text-gray-500">Categories List</li>
        </ol>
      </nav>
      <hr className="border-gray-700 dark:border-gray-600" />
      <button
        type="button"
        onClick={notify}
        className="px-3.5 py-2 w-max ml-auto my-3 rounded-lg border border-dashed border-primary text-white bg-primary dark:bg-gray-900 dark:text-primary text-sm font-semibold"
      >
        + Add new category
      </button>
      <div className="grid grid-cols-4 gap-4 mt-2 overflow-y-auto h-max">
        {loading ? (
          <>
            <CategoryCardSkeleton />
            <CategoryCardSkeleton />
            <CategoryCardSkeleton />
            <CategoryCardSkeleton />
          </>
        ) : (
          <>
            {error && <p>{error.message}</p>}
            {categoriesData &&
              categoriesData.data?.map((element) => {
                return (
                  <CategoryCard
                    key={element.id}
                    id={element.id}
                    name={element.name}
                    description={element.description}
                  />
                );
              })}
          </>
        )}
      </div>
    </div>
  );
}

export default CategoriesList;
