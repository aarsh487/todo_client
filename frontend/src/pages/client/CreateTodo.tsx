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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTodo } from "@/contexts/TodoContext";
import { Spinner } from "@/components/Spinner";

const todoSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(100, "Title cannot exceed 100 characters"),
  description: z.string().max(500, "Description cannot exceed 500 characters"),
});

type TodoFormData = z.infer<typeof todoSchema>;

const CreateTodo = () => {
  const { createTodo } = useTodo();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (data: TodoFormData) => {
    setIsSubmitting(true);
    try {
      await createTodo(data.title, data.description || "");
      form.reset();
    } catch (error) {
      console.error("Error creating todo:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create a New Todo</h1>
        
        <Card className="shadow-md border-2 border-primary/10">
          <CardHeader>
            <CardTitle>New Task</CardTitle>
            {/* <CardDescription>
              Add a new task to your todo list
            </CardDescription> */}
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter task title"
                          disabled={isSubmitting}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter task details"
                          className="resize-none min-h-[100px]"
                          disabled={isSubmitting}
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
                    disabled={isSubmitting}
                    className="px-8"
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner size="sm" className="mr-2" />
                        Creating...
                      </>
                    ) : (
                      "Create Todo"
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

export default CreateTodo;
