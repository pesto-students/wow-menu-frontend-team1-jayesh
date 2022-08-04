import { FaRegUser } from "react-icons/fa";
import FloatingButton from "../components/FloatingButton";

function CallWaiter() {
  const handleCall = () => {
    // eslint-disable-next-line
    window.alert("Waiter!!!");
  };
  return (
    <div className="absolute bottom-20 right-8">
      <FloatingButton onClick={handleCall} size="large">
        <FaRegUser />
      </FloatingButton>
    </div>
  );
}

export default CallWaiter;
