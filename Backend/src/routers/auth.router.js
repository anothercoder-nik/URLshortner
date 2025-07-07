import express from 'express';
import { register_user, login_user } from '../controller/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const Router = express.Router();

Router.post('/register', register_user)
Router.post('/login', login_user);
Router.get('/me',authMiddleware, (req, res) => {
    res.status(200).json(req.user)
})


export default Router;