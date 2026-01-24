import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex h-screen">

      <div className="fixed top-0 left-0 h-screen w-60">
        <Sidebar />
      </div>

      <div className="lg:ml-60 flex-1 overflow-y-auto bg-gray-50/40 ">
        <Outlet />
      </div>

    </div>
  );
};

export default AdminLayout;
