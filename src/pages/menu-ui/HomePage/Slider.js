import { useDispatch, useSelector } from "react-redux";
import TextButton from "../components/TextButton";
import { setCategory } from "../../../redux/reducers/menuReducer";

function Slider() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.menu.categories);
  const selectedCategory = useSelector((state) => state.menu.selectedCategory);
  const handleClick = (item) => {
    dispatch(setCategory(item));
  };

  return (
    <div className="mt-3 overflow-auto touch-pan-x w-100 scroll-smooth slider">
      <div className="flex whitespace-nowrap snap-x">
        {categories.map((category) => (
          <TextButton
            key={category}
            className="snap-start"
            active={category === selectedCategory}
            onClick={() => handleClick(category)}
          >
            {category}
          </TextButton>
        ))}
      </div>
    </div>
  );
}

export default Slider;
