import { FaRegUser } from "react-icons/fa";
import FloatingButton from "./FloatingButton";

function CallWaiter() {
  const handleCall = () => {
    window.alert("Waiter!!!");
  };
  return (
    <div className="absolute bottom-10 right-8">
      <FloatingButton onClick={handleCall} size="large">
        <FaRegUser />
      </FloatingButton>
    </div>
  );
}

export default CallWaiter;
