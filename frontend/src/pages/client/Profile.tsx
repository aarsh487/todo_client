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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { Spinner } from "@/components/Spinner";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const profileForm = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
    },
  });

  const handleProfileUpdate = async (data: z.infer<typeof profileSchema>) => {
    setIsUpdating(true);
    try {
      const success = await updateProfile({
        name: data.name,
        phone: data.phone,
        password: data.password
      });
      
      if (success) {
        profileForm.reset({
          name: data.name,
          phone: data.phone,
          password: data.password
        });
      }
    } catch (error) {
      console.error("Profile update error:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-1 mb-8">
            <TabsTrigger value="profile">Profile Information</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <Card className="shadow-md border-2 border-primary/10">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                {/* <CardDescription>
                  Update your personal details
                </CardDescription> */}
              </CardHeader>
              <CardContent>
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(handleProfileUpdate)} className="space-y-6">
                    <FormField
                      control={profileForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your name"
                              disabled={isUpdating}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profileForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your phone number"
                              disabled={isUpdating}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profileForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="New password"
                              disabled={isUpdating}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="pt-2">
                      <Input
                        value={user?.email}
                        disabled
                        className="bg-muted"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Email cannot be changed
                      </p>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        disabled={isUpdating}
                      >
                        {isUpdating ? (
                          <>
                            <Spinner size="sm" className="mr-2" />
                            Updating...
                          </>
                        ) : (
                          "Save Changes"
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
