import { RiCloseFill } from "react-icons/ri";
import FloatingButton from "./FloatingButton";

function CloseButton({ onClick }) {
  return (
    <FloatingButton onClick={onClick}>
      <RiCloseFill />
    </FloatingButton>
  );
}

export default CloseButton;
