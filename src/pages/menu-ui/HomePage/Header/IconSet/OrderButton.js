import { BiFoodMenu } from "react-icons/bi";
import IconButton from "../../../components/IconButton";

function OrderButton() {
  return (
    <IconButton theme="primary" href="/status">
      <BiFoodMenu size="26" />
    </IconButton>
  );
}

export default OrderButton;
