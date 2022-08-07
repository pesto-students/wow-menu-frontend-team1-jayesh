import { FiChevronLeft } from "react-icons/fi";
import Button from "./Button";

function BackButton() {
  return (
    <Button className="m-2" size="small" href="/home">
      <FiChevronLeft />
      Menu
    </Button>
  );
}

export default BackButton;
