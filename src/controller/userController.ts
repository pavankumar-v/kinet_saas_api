import prisma from '@db/index';
import { Request, Response } from 'express';
const User = prisma.user;

export class userController {
    static createUser = async (req: Request, res: Response) => {
        try {
            const user = User.create({
                data: req.body['user'],
            });
            res.status(200).send(user);
        } catch (error) {
            res.status(500).json(error);
        }
    };
}
