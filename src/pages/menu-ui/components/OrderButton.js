import { BsBookmarkDash } from "react-icons/bs";
import IconButton from "./IconButton";

function OrderButton({ onClick }) {
  return (
    <IconButton theme="primary" onClick={onClick}>
      <BsBookmarkDash size="26" />
    </IconButton>
  );
}

export default OrderButton;
