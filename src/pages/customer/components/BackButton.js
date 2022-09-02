import { FiChevronLeft } from "react-icons/fi";
import Button from "../../../shared/components/Button";

function BackButton() {
  return (
    <Button className="m-2" size="small" href="/home">
      <FiChevronLeft className="my-1 text-lg" />
      Menu
    </Button>
  );
}

export default BackButton;
