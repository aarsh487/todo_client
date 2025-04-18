import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './utils/dbConnect';
import { PORT } from './utils/getEnv';
dotenv.config();
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes';
import todoRoutes from './routes/todo.routes';
import userRoutes from './routes/user.routes';


const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://clientodo.netlify.app'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true, 
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/user', userRoutes);

connectDb().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  });