import { userController } from '@/controller';
import express from 'express';
const router = express.Router();

router.post('/users', userController.createUser);
