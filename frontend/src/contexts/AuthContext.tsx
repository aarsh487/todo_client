import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from "sonner"
import axiosInstance from '@/lib/axiosInstance';


interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: number;
  password: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, phone: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
  isAuthenticated: boolean;
  isAdmin: boolean;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => { 
    try {
      const response = await axiosInstance.get(`/user`);
      setUser(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Auth check failed', error);
      localStorage.removeItem('token');
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(`/auth/login`, { 
        email, 
        password 
      });
      
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      toast(`Welcome back, ${user.name}!`);
    } catch (error: any) {
      console.error('Login failed', error);
      toast(error.response?.data?.message || "Invalid credentials");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, phoneNumber: string, password: string) => {
    setLoading(true);
    try {
      await axiosInstance.post(`/auth/register`, {
        name,
        email,
        phoneNumber,
        password,
        role: 1
      });
      toast( "You can now login with your credentials.");
    } catch (error: any) {
      console.error('Registration failed', error);
      toast( error.response?.data?.message || "Could not create account");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    toast("You have been successfully logged out.");
  };

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    try {
      const response = await axiosInstance.put(`/user/${user?._id}`, data);
      setUser(prev => prev ? { ...prev, ...response.data } : null);
      
      toast("Profile Updated.");
      return true;
    } catch (error: any) {
      console.error('Profile update failed', error);
      toast("Profile update failed.");
      return false;
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    try {
      await axiosInstance.post(`/user/password`, {
        currentPassword,
        newPassword
      });
      
      toast("Password Changed Succesfully.");
      return true;
    } catch (error: any) {
      console.error('Password update failed', error);
      toast("Password Change Failed.");
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      updateProfile,
      updatePassword,
      isAuthenticated: !!user,
      isAdmin: user?.role === 0,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
