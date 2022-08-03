import { useState } from "react";
import TextButton from "../components/TextButton";

const classes = {
  base: "flex whitespace-nowrap snap-x",
  wrapper: "overflow-auto touch-pan-x w-100 mt-3 scroll-smooth",
};

function Slider({ categories, theme }) {
  const [active, setActive] = useState(categories[0]);
  const handleClick = (category) => {
    setActive(category);
  };
  return (
    <div className={`${classes.wrapper}`}>
      <div className={`${classes.base}`}>
        {categories.map((category) => (
          <TextButton
            key={category}
            theme={theme}
            className="snap-start"
            active={category === active}
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
