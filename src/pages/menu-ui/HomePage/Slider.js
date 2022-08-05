import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextButton from "../components/TextButton";
import { setCategory } from "../../../redux/reducers/productReducer";

function Slider() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.items);
  const selectedCategory = useSelector(
    (state) => state.product.selectedCategory,
  );
  const categories = [...new Set(products.map((item) => item.category))];
  useEffect(() => {
    dispatch(setCategory(categories[0]));
  }, [products]);

  return (
    <div className="mt-3 overflow-auto touch-pan-x w-100 scroll-smooth slider">
      <div className="flex whitespace-nowrap snap-x">
        {categories.map((category) => (
          <TextButton
            key={category}
            className="snap-start"
            active={category === selectedCategory}
            onClick={() => dispatch(setCategory(category))}
          >
            {category}
          </TextButton>
        ))}
      </div>
    </div>
  );
}

export default Slider;
