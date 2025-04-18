import { useEffect, useState } from "react";
import { useTodo } from "@/contexts/TodoContext";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Card, CardContent } from "@/components/ui/card";



interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

const ClientTodos = () => {
  const { fetchTodos } = useTodo();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

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
      <h1 className="text-3xl font-bold mb-6">Client Todo Lists</h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner size="lg" />
        </div>
      ) : todos.length === 0 ? (
        <Card className="border-2 border-primary/10 bg-muted/50">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">
              
                
                There are no todos available
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableCaption>A list of client todos</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {todos.map((todo) => (
                  <TableRow key={todo._id}>
                    <TableCell className="font-medium">{todo.title}</TableCell>
                    <TableCell className="font-medium">{todo.description}</TableCell>
                    <TableCell>{format(new Date(todo.createdAt), "PP")}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
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

export default ClientTodos;
