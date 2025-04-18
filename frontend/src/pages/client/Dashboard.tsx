
import { Routes, Route } from "react-router-dom";
import { ClientSidebar } from "@/components/layout/Sidebar";
import { TodoProvider } from "@/contexts/TodoContext";
import CreateTodo from "./CreateTodo";
import ViewTodos from "./ViewTodos";
import Profile from "./Profile";

const ClientDashboard = () => {
  return (
    <TodoProvider>
      <div className="flex h-screen">
        <ClientSidebar />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<CreateTodo />} />
            <Route path="/todos" element={<ViewTodos />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </TodoProvider>
  );
};

export default ClientDashboard;