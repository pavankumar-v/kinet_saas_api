import express, { type Express, type Request, type Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { userRoutes, webhookRoutes } from '@/routes/index';
import './config';

const app: Express = express();
// Enable CORS
app.use(cors());

// Enable the use of request body parsing middleware
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

app.use('/users', userRoutes);
app.use('/webhooks', webhookRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Running');
});

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
