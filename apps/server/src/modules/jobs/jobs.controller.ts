import { Request, Response } from "express"
import { createJobSchema } from "./jobs.schemas";
import { toJobDetails, toJobListItem } from "./jobs.mapper";
import { JobsService } from './jobs.service'

export class JobsController {
    constructor(
        private readonly jobsService: JobsService
    ) {}

    create = async (
        req: Request, 
        res: Response
    ) => {
        const input = createJobSchema.parse(req.body);

        const job = await this.jobsService.create(input);

        res.status(201).json({
            jobId: job.id,
        });
    };

    getAll = (
        _req: Request,
        res: Response,
    ) => {
        const jobs = this.jobsService.getAll();

        res.json(
            jobs.map(toJobListItem)
        );
    };

    getById = (
        req: Request,
        res: Response
    ) => {
        const jobId = Array.isArray(req.params.id)
            ? req.params.id[0]
            : req.params.id;

        const job = this.jobsService.getById(jobId);

        res.json(toJobDetails(job));
    };

    cancel = (
        req: Request,
        res: Response,
    ) => {
        const jobId = Array.isArray(req.params.id)
            ? req.params.id[0]
            : req.params.id;


        this.jobsService.cancel(jobId);

        res.status(204).send();
    }
}