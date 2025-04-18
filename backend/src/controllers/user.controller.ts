import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.model";

interface AuthRequest extends Request {
    user?: any;
  }

export const updateUserProfile = async (req: AuthRequest, res: Response) => {
    try {
      const user = await User.findById(req.user._id);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
  
      const { name, password, phone } = req.body;
  
      if (name) user.name = name;
      if (phone) user.phoneNumber = phone;
  
      if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
      }
  
      const updatedUser = await user.save();
  
      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phoneNumber: updatedUser.phoneNumber,
        role: updatedUser.role,
      });
    } catch (err) {
      console.error("Error updating user profile:", err);
      res.status(500).json({ message: "Server error" });
    }
  };

  export const getUser = async(req: AuthRequest, res: Response) => {
    try {
        const user = {
          _id: req.user._id,
          name: req.user.name,
          email: req.user.email,
          phoneNumber: req.user.phoneNumber,
          role: req.user.role
        };
        
        res.status(200).json(user);
      } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ message: 'Error getting user information' });
      }
  }

export const updatePassword =  async(req: AuthRequest, res: Response) => {
    try {
      const { currentPassword, newPassword } = req.body;
      
      const user = await User.findById(req.user._id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ message: 'Current password is incorrect' });
        return;
      }
      
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      
      await user.save();
      
      res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error('Password update error:', error);
      res.status(500).json({ message: 'Error updating password' });
    }
  };
  