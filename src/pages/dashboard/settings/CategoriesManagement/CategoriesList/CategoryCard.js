import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function CategoryCard({ id, name, description }) {
  const navigate = useNavigate();
  return (
    <div className="relative flex flex-col w-auto px-4 pt-4 pb-12 overflow-visible transition duration-200 transform bg-white border rounded-md shadow-sm cursor-pointer hover:scale-105 border-dark-text2 dark:border-light-text1 dark:bg-gray-900 gap-y-3">
      <div className="text-2xl font-bold tracking-wide text-center text-md text-light-text1 dark:text-dark-text1">
        {name}
      </div>
      <div className="text-center text-light-text1 dark:text-dark-text2 line-clamp-3">
        {description}
      </div>
      <div
        className="absolute bottom-0 w-full py-2 bg-[#ea7c695c] -mx-4 rounded-b-md cursor-pointer"
        aria-hidden="true"
        onClick={() => navigate(`/dashboard/settings/edit-category/${id}`)}
      >
        <div className="flex items-center justify-center text-center text-primary">
          <FaRegEdit />
          <span className="ml-2 text-sm">Edit Category</span>
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;
