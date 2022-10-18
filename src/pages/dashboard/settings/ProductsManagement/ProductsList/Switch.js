import { GiPlainCircle } from "react-icons/gi";

export default function Switch({ value, onClick }) {
  return (
    <button
      type="button"
      className="relative w-10 h-5 mx-1 rounded-full bg-gray-500/30"
      onClick={onClick}
    >
      <GiPlainCircle
        className={`absolute top-0 m-0.5 ${
          value ? "text-accent-green right-0" : "text-gray-500 left-0"
        } `}
      />
    </button>
  );
}
