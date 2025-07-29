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

// CORS configuration
const allowedOrigins = [
    "http://localhost:5173",
    "https://clipli.onrender.com",
    "https://app.clipli.sbs",
    process.env.FRONTEND_URL
].filter(Boolean);

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like curl or mobile apps)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};

// ✅ Set CORS middleware first
app.use(cors(corsOptions));

// ✅ Handle preflight OPTIONS requests globally
app.options('*', cors(corsOptions));

// Cookie and body parsing
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Attach user (should be after CORS & body parsing)
app.use(attachuser);

// Connect to DB before handling routes
connectDB();

// Health check
app.get('/health', (_req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// API routes
app.use("/api/user", user_routes);
app.use("/api/auth", authRoutes);
app.use("/api/create", short_url);

// Short URL redirect (should be last route)
app.get("/:id", redirectFromShortUrl);

// Global error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
