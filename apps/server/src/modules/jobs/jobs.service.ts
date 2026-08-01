import { AppError } from "../../common/errors/AppError";

import { JobsRepository } from "./jobs.repository"
import { JobsProcessor } from "./jobs.processor";
import { CreateJobInput } from "./jobs.schemas";

export class JobsService {
    constructor(
        private readonly repository: JobsRepository,
        private readonly processor: JobsProcessor,
    ) { }

    async create(input: CreateJobInput) {
        const job = this.repository.create(input.urls);

        void this.processor.process(job.id).catch(
            (error: string) => {
                console.error(
                    `Failed to process job ${job.id}`,
                    error,
                );

                this.repository.updateJob(job.id, {
                    status: 'failed'
                });
            }
        );

        return job;
    }

    getAll() {
        return this.repository.findAll();
    }

    getById(id: string) {
        const job = this.repository.findById(id);

        if (!job) {
            throw new AppError(
                404,
                'Job not found'
            )
        }

        return job;
    }

    cancel(id: string) {
        const job = this.repository.findById(id);

        if (!job) {
            throw new AppError(
                404,
                'Job not found'
            )
        }
        if (job.status === 'completed') {
            throw new AppError(
                409,
                'Completed job cannot be cancelled'
            )
        }
        return this.repository.cancel(id);
    }

}