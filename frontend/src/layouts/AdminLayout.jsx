import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex h-screen">

      <div className="fixed top-0 left-0 h-screen w-70">
        <Sidebar />
      </div>

      <div className="lg:ml-70 flex-1 overflow-y-auto bg-gray-100 p-2">
        <Outlet />
      </div>

    </div>
  );
};

export default AdminLayout;
