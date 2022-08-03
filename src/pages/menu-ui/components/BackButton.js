import { FiChevronLeft } from "react-icons/fi";
import Button from "./Button";

function BackButton({ onClick }) {
  return (
    <Button className="m-2" size="small" onClick={onClick}>
      <FiChevronLeft />
      Menu
    </Button>
  );
}

export default BackButton;
