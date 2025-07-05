import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import shortUrlRouter from './routers/short_url.router.js';
import { redirectFromShortUrl } from './controller/short_url.controller.js';
import { errorHandler } from './utils/errorHandler.js';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to DB before handling routes
connectDB();

// Create a new short URL
app.use('/api/create', shortUrlRouter);

// Redirect based on short URL
app.get("/:id", redirectFromShortUrl);
app.use(errorHandler);


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
