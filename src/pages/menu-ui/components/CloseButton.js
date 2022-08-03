import { RiCloseFill } from "react-icons/ri";
import FloatingButton from "./FloatingButton";

function HandleClick() {
  // window.alert("Called Waiter");
}

function CloseButton() {
  return (
    <FloatingButton onClick={HandleClick}>
      <RiCloseFill />
    </FloatingButton>
  );
}

export default CloseButton;
