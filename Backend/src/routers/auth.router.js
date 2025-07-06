import express from 'express';
import { register_user, login_user } from '../controller/auth.controller.js';

const Router = express.Router();

Router.post('/register', register_user)
Router.post('/login', login_user);


export default Router;