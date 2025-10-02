import { Outlet } from "react-router-dom";
import AdminSidebar from "../features/admin/AdminSidebar";


const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-4">
        <Outlet /> {/* Admin pages go here */}
      </div>
    </div>
  );
};

export default AdminLayout;
