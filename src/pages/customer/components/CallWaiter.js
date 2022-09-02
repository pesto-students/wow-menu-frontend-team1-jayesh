import Swal from "sweetalert2";
import { FaConciergeBell } from "react-icons/fa";
import FloatingButton from "./FloatingButton";
import NotificationService from "../../../services/notification";

const classes = {
  pos: {
    left: "absolute bottom-20 right-8",
    middle: "absolute bottom-40 inset-x-0 flex justify-center",
  },
};

function CallWaiter({ pos = "left" }) {
  const { callWaiter } = NotificationService();
  const handleCall = () => {
    callWaiter();
    Swal.fire({
      text: "Waiter is on his way",
      icon: "success",
      showConfirmButton: false,
      width: 300,
      timer: 1500,
    });
  };
  return (
    <div className={`${classes.pos[pos]}`}>
      <FloatingButton onClick={handleCall} size="large">
        <FaConciergeBell />
      </FloatingButton>
    </div>
  );
}

export default CallWaiter;
