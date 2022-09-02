import { Outlet } from "react-router-dom";
import DashboardSideBar from "./components/Sidebar";
import DashboardNotification from "../../services/dashboardNotification";

function Dashboard() {
  DashboardNotification();
  return (
    <div className="flex w-full min-h-screen font-sans bg-primary_light dark:bg-gray-800">
      <DashboardSideBar />
      <Outlet />
    </div>
  );
}

export default Dashboard;
