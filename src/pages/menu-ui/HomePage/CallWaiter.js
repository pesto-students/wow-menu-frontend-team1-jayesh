import Swal from "sweetalert2";
import { FaRegUser } from "react-icons/fa";
import FloatingButton from "../components/FloatingButton";

function CallWaiter() {
  const handleCall = () => {
    Swal.fire({
      title: "Called Waiter",
      icon: "success",
      showConfirmButton: false,
      width: 300,
      timer: 1500,
    });
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
