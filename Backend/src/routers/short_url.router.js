// src/routers/short_url.router.js

import express from 'express';
import { createShortUrl } from '../controller/short_url.controller.js';

const router = express.Router(); 
router.post("/", createShortUrl);
export default router;
