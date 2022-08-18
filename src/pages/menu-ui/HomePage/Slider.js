import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import TextButton from "../components/TextButton";
import { selectCategory } from "../../../store/reducers/productReducer";

function Slider() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.product.categories);
  const selectedCategory = useSelector(
    (state) => state.product.selectedCategory,
  );

  return (
    <div className="mt-3 overflow-auto touch-pan-x w-100 scroll-smooth slider">
      <div className="flex whitespace-nowrap snap-x">
        {categories.length === 0 && (
          <div className="flex my-3 space-x-4 animate-pulse">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="w-20 h-6 rounded-full bg-slate-300 dark:bg-slate-700"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="w-20 h-6 rounded-full bg-slate-300 dark:bg-slate-700"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="w-20 h-6 rounded-full bg-slate-300 dark:bg-slate-700"
            />
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
