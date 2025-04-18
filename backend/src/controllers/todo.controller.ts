import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth";
import Todo from "../models/todo.model";

export const addTodo = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { title, description } = req.body;

    if (!title || !description) {
      res.status(400).json({ message: "Title and description are required" });
      return;
    }

    const newTodo = new Todo({
      title,
      description,
      user: user._id,
    });
    await newTodo.save();

    res
      .status(201)
      .json({ message: "Todo created successfully", todo: newTodo });
  } catch (error) {
    console.error("Add todo error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTodo = async (req: AuthRequest, res: Response) => {
  try {
    const page: number = parseInt(req.query.page as string) || 1;
    const limit: number = parseInt(req.query.limit as string) || 10;
    const skip: number = (page - 1) * limit;

    const user = req.user;
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (user?.role === 1 && user._id) {
      const todos = await Todo.find({user: user._id})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const totalTodos = await Todo.countDocuments(user._id);
      const totalPages = Math.ceil(totalTodos / limit);

      console.log(todos);

      res.status(200).json({
        todos,
        currentPage: page,
        totalPages,
        totalTodos,
      });
      return;
    } else if (user?.role === 0) {
      const todos = await Todo.find().sort({ createdAt: -1 }).skip(skip).limit(limit);

      const totalTodos = await Todo.countDocuments();
      const totalPages = Math.ceil(totalTodos / limit);

      console.log(todos);

      res.status(200).json({
        todos,
        currentPage: page,
        totalPages,
        totalTodos,
      });
      return;
    }
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ message: "Error fetching todos" });
  }
};
