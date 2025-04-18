import { useEffect, useState } from "react";
import { useTodo } from "@/contexts/TodoContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/Spinner";
import { format } from "date-fns";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

const ViewTodos = () => {
  const { fetchTodos } = useTodo();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadTodos = async () => {
      setIsLoading(true);
      try {
        const result = await fetchTodos(currentPage, 10);
        setTodos(result.todos);
        setTotalPages(result.totalPages);
      } catch (error) {
        console.error("Error loading todos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTodos();
  }, [currentPage]);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Todos</h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner size="lg" />
        </div>
      ) : todos?.length === 0 ? (
        <Card className="border-2 border-primary/10 bg-muted/50">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">
               You don't have any todos yet
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {todos?.map((todo) => (
            <Card
              key={todo._id}
              className={`border-2 ${
                todo.completed
                  ? "border-green-200 bg-green-50"
                  : "border-primary/10"
              } transition-all hover:shadow-md`}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle
                      className={`text-xl ${
                        todo.completed ? "line-through text-muted-foreground" : ""
                      }`}
                    >
                      {todo.title}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Created: {format(new Date(todo.createdAt), "PPP")}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p
                  className={`text-sm ${
                    todo.completed ? "line-through text-muted-foreground" : ""
                  }`}
                >
                  {todo.description || "No description provided"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                {currentPage === 1 ? (
                  <PaginationPrevious 
                    className="pointer-events-none opacity-50" 
                    onClick={() => {}} 
                  />
                ) : (
                  <PaginationPrevious 
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
                  />
                )}
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={currentPage === page}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                {currentPage === totalPages ? (
                  <PaginationNext 
                    className="pointer-events-none opacity-50" 
                    onClick={() => {}} 
                  />
                ) : (
                  <PaginationNext 
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} 
                  />
                )}
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default ViewTodos;
