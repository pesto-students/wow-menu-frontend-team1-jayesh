import { Outlet } from "react-router-dom";
import initialSetup from "./initialSetup";
import RotateScreen from "./components/RotateScreen";

function Customer() {
  initialSetup();
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-light-base1 dark:bg-dark-base1">
      <RotateScreen />
      <Outlet />
    </div>
  );
}

export default Customer;
