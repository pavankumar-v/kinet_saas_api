import { userController } from '@/controller';
import { verifyWebhookEvent } from '@/middleware/auth';
import express, { Router } from 'express';

const router: Router = express.Router();

router.post(
    '/auth0/users',
    verifyWebhookEvent(process.env.AUTH0_WEBHOOK_SECRET || ''),
    userController.createUser,
);

export const webhookRoutes: Router = router;
