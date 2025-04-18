import { Routes, Route } from "react-router-dom";
import { AdminSidebar } from "@/components/layout/Sidebar";
import { TodoProvider } from "@/contexts/TodoContext";
import ClientTodos from "./ClientTodos";
import Profile from "./Profile";

const AdminDashboard = () => {
  return (
    <TodoProvider>
      <div className="flex h-screen">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<ClientTodos />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </TodoProvider>
  );
};

export default AdminDashboard;