import { FiChevronLeft } from "react-icons/fi";
import IconButton from "./IconButton";

function BackButton({ href }) {
  return (
    <IconButton theme="primary" href={href}>
      <FiChevronLeft size="26" />
    </IconButton>
  );
}

export default BackButton;
