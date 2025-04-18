import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      const dashboardPath = isAdmin ? "/admin" : "/client";
      navigate(dashboardPath);
    }
  }, [isAuthenticated, isAdmin, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-white p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4">
          TaskMaster Pro
        </h1>
        <p className="text-xl text-gray-600 max-w-md mx-auto">
          Manage your tasks efficiently with our powerful todo application.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        <Card className="border-2 border-primary/10 shadow-md transform transition-all hover:shadow-lg hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="text-2xl">For Clients</CardTitle>
            <CardDescription>
              Create and manage your todo lists with ease
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Create custom todo lists</li>
              <li>Track your progress</li>
              <li>Manage your profile</li>
              <li>Mobile-friendly interface</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={() => navigate("/register")}
            >
              Sign Up as Client
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-2 border-primary/10 shadow-md transform transition-all hover:shadow-lg hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="text-2xl">For Administrators</CardTitle>
            <CardDescription>
              Monitor and manage client todo lists
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>View all client todo lists</li>
              <li>Paginated client data</li>
              <li>Easy to use admin panel</li>
              <li>Secure access control</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate("/login")}
            >
              Admin Login
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-12 flex gap-4">
        <Button 
          variant="default" 
          size="lg"
          onClick={() => navigate("/login")}
        >
          Log In
        </Button>
        <Button 
          variant="outline" 
          size="lg"
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
      </div>
    </div>
  );
};

export default Index;
