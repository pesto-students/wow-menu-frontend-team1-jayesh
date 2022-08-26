import { FiChevronLeft } from "react-icons/fi";
import IconButton from "../../../../shared/components/IconButton";

function BackButton() {
  return (
    <IconButton theme="primary" href="/home">
      <FiChevronLeft size="26" />
    </IconButton>
  );
}

export default BackButton;
