import { useDispatch, useSelector } from "react-redux";
import ButtonLoader from "../components/ButtonLoader";
import TextButton from "../components/TextButton";
import CategoriesService from "../../../services/categories";
import { selectCategory } from "../../../store/reducers/productReducer";

function Slider() {
  const dispatch = useDispatch();
  const { loading } = CategoriesService();
  const categories = useSelector((state) => state.product.categories);
  const selectedCategory = useSelector(
    (state) => state.product.selectedCategory,
  );
  return (
    <div className="mt-3 overflow-auto touch-pan-x w-100 scroll-smooth customer">
      <div className="flex whitespace-nowrap snap-x">
        {loading && (
          <div className="flex my-3 space-x-4 animate-pulse">
            <ButtonLoader />
            <ButtonLoader />
            <ButtonLoader />
          </div>
        )}
        {categories.map((category) => (
          <TextButton
            key={category.id}
            className="snap-start"
            active={category.id === selectedCategory.id}
            onClick={() => dispatch(selectCategory(category))}
          >
            <p className="capitalize">{category.name}</p>
          </TextButton>
        ))}
      </div>
    </div>
  );
}

export default Slider;
