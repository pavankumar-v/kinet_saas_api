import prisma from '@/db';
import { verifyWebhookEvent } from '@/middleware/auth';
import express, { Router } from 'express';

const router: Router = express.Router();

router.post(
    '/auth0/users',
    verifyWebhookEvent(process.env.AUTH0_WEBHOOK_SECRET || ''),
    async (req, res) => {
        const { email, given_name, family_name, auth0_id } = req.body['user'];
        const user = await prisma.user.findUnique({
            where: { auth0_id: auth0_id },
        });
        if (user) {
            res.status(201).send('user exists');
        } else {
            const newUser = await prisma.user
                .create({
                    data: { email, family_name, given_name, auth0_id },
                })
                .catch((err) => {
                    console.log(err);
                });

            res.json({ newUser });
        }
    },
);

export const webhookRoutes: Router = router;
