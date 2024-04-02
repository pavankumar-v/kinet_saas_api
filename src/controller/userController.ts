import prisma from '@db/index';
import { Request, Response } from 'express';
const User = prisma.user;

export class userController {
    static createUser = async (req: Request, res: Response) => {
        try {
            const { email, given_name, family_name, auth0_id } = req.body['user'];
            const user = await User.findUnique({
                where: { auth0_id: auth0_id },
            });

            if (user) {
                res.status(201).send('user exists');
            } else {
                const newUser = await User.create({
                    data: { email, family_name, given_name, auth0_id },
                }).catch((err) => {
                    console.log(err);
                });

                res.status(201).json({ newUser });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    };
}
