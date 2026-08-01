import express, {Request, Response} from 'express';

import { jobsRouter } from './modules/jobs/jobs.routes';
import { errorHandler } from './common/errors/error-handler';

export const app = express();

app.use(express.json());

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