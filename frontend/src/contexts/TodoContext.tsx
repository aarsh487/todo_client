import React, { createContext, useState, useContext } from 'react';
import { toast } from "sonner"
import axiosInstance from '@/lib/axiosInstance';


interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface TodoContextType {
  todos: Todo[];
  loading: boolean;
  createTodo: (title: string, description: string) => Promise<void>;
  fetchTodos: (page?: number, limit?: number) => Promise<{todos: Todo[], totalPages: number}>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTodos = async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      let url =`/todos?page=${page}&limit=${limit}`;
      const response = await axiosInstance.get(url);
      setTodos(response.data.todos);
      setLoading(false);
      
      return {
        todos: response.data.todos,
        totalPages: response.data.totalPages
      };
    } catch (error) {
      console.error('Error fetching todos:', error);
      setLoading(false);
      toast("Failed to fetch todos");
      return { 
        todos: [],
        totalPages: 0
      };
    }
  };

  const createTodo = async (title: string, description: string) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(`todos`, {
        title,
        description
      });
      
      setTodos(prevTodos => [response.data, ...prevTodos]);
      toast("Your todo item has been created successfully.");
    } catch (error) {
      console.error('Error creating todo:', error);
      toast("Failed to create todo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TodoContext.Provider value={{
      todos,
      loading,
      createTodo,
      fetchTodos,
    }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};
