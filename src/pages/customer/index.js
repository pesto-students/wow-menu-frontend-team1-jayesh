import { Outlet } from "react-router-dom";
import initialSetup from "./initialSetup";
import RotateScreen from "./components/RotateScreen";
import CustomerSocket from "../../services/customerSocket";

function Customer() {
  initialSetup();
  CustomerSocket();
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-light-base1 dark:bg-dark-base1 customer">
      <RotateScreen />
      <Outlet />
    </div>
  );
}

export default Customer;
