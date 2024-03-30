import { userController } from '@/controller';
import { checkJwt } from '@/middleware/auth';
import express, { Router } from 'express';

const router: Router = express.Router();

// private routes
router.use(checkJwt);
router.post('/', userController.createUser);

export const userRoutes: Router = router;
