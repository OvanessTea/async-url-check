import express, {Request, Response} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { jobsRouter } from './modules/jobs/jobs.routes';
import { errorHandler } from './common/errors/error-handler';

export const app = express();
dotenv.config();
app.use(express.json());
const corsOptions = {
    origin: process.env.CLIENT_URL,
    optionsSuccessStatus: 200,
    credentials: true,
};

app.use(cors(corsOptions));
app.get('/health', (_req: Request, res: Response) => {
    res.json({
        status: 'ok'
    })
})

app.use(
    '/api/jobs',
    jobsRouter,
);

app.use(errorHandler);