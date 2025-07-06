import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import shortUrlRouter from './routers/short_url.router.js';
import { redirectFromShortUrl } from './controller/short_url.controller.js';
import { errorHandler } from './utils/errorHandler.js';
import cors from 'cors';
import authRoutes from './routers/auth.router.js';
import cookieParser from 'cookie-parser';
import { attachuser } from './utils/attachuser.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(attachuser)
// Connect to DB before handling routes
connectDB();

// Create a new short URL
app.use('/api/create', shortUrlRouter);
app.use('/api/auth',authRoutes);

// Redirect based on short URL
app.get("/:id", redirectFromShortUrl);

app.use(errorHandler);


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
