import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { JWT_SECRET } from "../utils/getEnv";
import type { CookieOptions } from 'express';

const COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 1000 * 60 * 60 * 24 * 7,
};


// Signup
export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phoneNumber, role=1 } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Email already in use" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      role
    });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, COOKIE_OPTIONS);
    res
      .status(201)
      .json({ user: { id: user._id, name: user.name, email: user.email, phoneNumber: user.phoneNumber, role: user.role } });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Signup failed", error: (err as Error).message });
  }
};

// Signin
export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, COOKIE_OPTIONS);
    res
      .status(200)
      .json({ user: { id: user._id, name: user.name, email: user.email, phoneNumber: user.phoneNumber, role: user.role } });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Signin failed", error: (err as Error).message });
  }
};

// Signout
export const signout = (_req: Request, res: Response) => {
  res.clearCookie("token", COOKIE_OPTIONS);
  res.status(200).json({ message: "Signed out successfully" });
};
