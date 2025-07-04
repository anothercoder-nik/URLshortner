// src/routers/short_url.router.js

import express from 'express';
import {createShortUrlnow}  from '../controller/short_url.controller.js'; // ✅ fix: use named import

const router = express.Router(); 
router.post("/", createShortUrlnow);
export default router;
