import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Spinner } from "@/components/Spinner";

const passwordSchema = z.object({
  currentPassword: z.string().min(6, "Password must be at least 6 characters"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Profile = () => {
  const { user, updatePassword } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);

  const form = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handlePasswordUpdate = async (data: z.infer<typeof passwordSchema>) => {
    setIsUpdating(true);
    try {
      const success = await updatePassword(data.currentPassword, data.newPassword);
      
      if (success) {
        form.reset({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      console.error("Password update error:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin Profile</h1>

        <Card className="shadow-md border-2 border-primary/10 mb-8">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>
              Your administrator account details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Name</label>
                <Input
                  value={user?.name || ""}
                  disabled
                  className="bg-muted mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <Input
                  value={user?.email || ""}
                  disabled
                  className="bg-muted mt-1"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Role</label>
              <Input
                value="Administrator"
                disabled
                className="bg-muted mt-1"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-2 border-primary/10">
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>
              Update your password to keep your account secure
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handlePasswordUpdate)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Your current password"
                          disabled={isUpdating}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Your new password"
                          disabled={isUpdating}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm your new password"
                          disabled={isUpdating}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    variant="default"
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <>
                        <Spinner size="sm" className="mr-2" />
                        Updating...
                      </>
                    ) : (
                      "Change Password"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
