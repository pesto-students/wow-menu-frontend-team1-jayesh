import { FaRegUser } from "react-icons/fa";
import FloatingButton from "../components/FloatingButton";

function HandleClick() {
  // window.alert("Called Waiter");
}

function CallWaiter() {
  return (
    <div className="absolute bottom-20 right-8">
      <FloatingButton size="large" onClick={HandleClick}>
        <FaRegUser />
      </FloatingButton>
    </div>
  );
}

export default CallWaiter;
