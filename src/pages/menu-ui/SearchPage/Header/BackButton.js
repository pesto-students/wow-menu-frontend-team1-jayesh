import { FiChevronLeft } from "react-icons/fi";
import IconButton from "../../components/IconButton";

function OrderButton() {
  return (
    <IconButton theme="primary" href="/">
      <FiChevronLeft size="26" />
    </IconButton>
  );
}

export default OrderButton;
