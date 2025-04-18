import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ClientDashboard from "./pages/client/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";


const App = () => (
    <AuthProvider>
      <TooltipProvider>
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Client Routes */}
            <Route element={<ProtectedRoute allowedRole={1} />}>
              <Route path="/client/*" element={<ClientDashboard />} />
            </Route>
            
            {/* Protected Admin Routes */}
            <Route element={<ProtectedRoute allowedRole={0} />}>
              <Route path="/admin/*" element={<AdminDashboard />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
);

export default App;

