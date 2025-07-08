import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { redirectFromShortUrl } from './controller/short_url.controller.js';
import { errorHandler } from './utils/errorHandler.js';
import cors from 'cors';
import authRoutes from './routers/auth.router.js';
import cookieParser from 'cookie-parser';
import { attachuser } from './utils/attachuser.js';
import user_routes from './routers/user.route.js';
import short_url from './routers/short_url.router.js';

dotenv.config();
const app = express();

// CORS configuration for production
const allowedOrigins = [
    "http://localhost:5173", // Development
    "https://clipli.onrender.com", // Your frontend URL
    process.env.FRONTEND_URL // Environment variable for frontend URL
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(attachuser)
// Connect to DB before handling routes
connectDB();

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use("/api/user",user_routes)
app.use("/api/auth",authRoutes)
app.use("/api/create",short_url)

// Short URL redirect (should be last to avoid conflicts)
app.get("/:id",redirectFromShortUrl)

app.use(errorHandler);


// Use PORT from environment variable or default to 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
