import { Router } from 'express';
import { register, login, userInfo, logout } from '../controllers/authController';

import { protectedRoute } from '../middleware/auth';

const router = Router();

// "/auth/register"
router.route('/register').post(register);

// "/auth/login"
router.route('/login').post(login);

// "/auth/user-info"
router.route('/user').get(protectedRoute, userInfo);

// "/auth/logout"
router.route('/logout').post(protectedRoute, logout);

export default router;
