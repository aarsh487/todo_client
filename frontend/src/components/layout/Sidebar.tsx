import { cn } from "@/lib/utils";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  ChevronLeft, 
  ChevronRight, 
  ListTodo,
  User,
  Settings,
  Users,
  LogOut 
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  end?: boolean;
}

interface SidebarProps {
  navItems: NavItemProps[];
}

const NavItem = ({ to, icon: Icon, label, end = false }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
          "text-muted-foreground hover:text-foreground",
          "hover:bg-accent",
          isActive ? "bg-accent text-foreground font-medium" : ""
        )
      }
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </NavLink>
  );
};

export function Sidebar({ navItems }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();

  return (
    <aside
      className={cn(
        "border-r bg-background flex-shrink-0 flex flex-col h-screen",
        "transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="px-4 py-6 border-b flex items-center justify-between">
        <h2
          className={cn(
            "font-semibold tracking-tight transition-all",
            collapsed ? "opacity-0 w-0" : "opacity-100"
          )}
        >
          TaskMaster Pro
        </h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
          <span className="sr-only">
            {collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          </span>
        </Button>
      </div>
      <ScrollArea className="flex-1 py-3 px-4">
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={collapsed ? "" : item.label}
              end={item.end}
            />
          ))}
        </nav>
      </ScrollArea>
      <div className="p-4 border-t">
        <Button 
          variant="ghost" 
          onClick={logout} 
          className={cn(
            "w-full justify-start",
            collapsed && "justify-center px-0"
          )}
        >
          <LogOut className="h-5 w-5 mr-2" />
          {!collapsed && <span>Log out</span>}
        </Button>
      </div>
    </aside>
  );
}

export function ClientSidebar() {
  return (
    <Sidebar
      navItems={[
        { to: "/client", icon: ListTodo, label: "Create Todo", end: true },
        { to: "/client/todos", icon: ListTodo, label: "My Todos" },
        { to: "/client/profile", icon: Settings, label: "Profile" },
      ]}
    />
  );
}

export function AdminSidebar() {
  return (
    <Sidebar
      navItems={[
        { to: "/admin", icon: Users, label: "Client Todos", end: true },
        { to: "/admin/profile", icon: User, label: "Profile" },
      ]}
    />
  );
}
