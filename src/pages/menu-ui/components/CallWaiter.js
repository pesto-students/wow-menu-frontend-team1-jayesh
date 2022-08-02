import { FaRegUser } from "react-icons/fa";
import Button from "./Button";

function CallWaiter({ onClick }) {
  return (
    <div className="absolute bottom-10 right-8">
      <Button fab onClick={onClick}>
        <FaRegUser />
      </Button>
    </div>
  );
}

export default CallWaiter;
