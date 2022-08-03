import TextButton from "../components/TextButton";

function Slider({ categories, active, onClick }) {
  return (
    <div className="mt-3 overflow-auto touch-pan-x w-100 scroll-smooth slider">
      <div className="flex whitespace-nowrap snap-x">
        {categories.map((category) => (
          <TextButton
            key={category}
            className="snap-start"
            active={category === active}
            onClick={() => onClick(category)}
          >
            {category}
          </TextButton>
        ))}
      </div>
    </div>
  );
}

export default Slider;
