import { JobsRepository } from "./jobs.repository"
import { JobsProcessor } from "./jobs.processor";
import { CreateJobInput } from "./jobs.schemas";

class JobsService {
    constructor(
        private readonly repository: JobsRepository,
        private readonly processor: JobsProcessor,
    ) {}

    async create(input: CreateJobInput) {
        const job = this.repository.create(input.urls);

        this.processor.process(job.id).catch((error: string) => {
            console.error(error);
        })

        return job;
    }

    getAll() {
        return this.repository.findAll();
    }

    getById(id: string) {
        return this.repository.findById(id);
    }

    cancel(id: string) {
        return this.repository.cancel(id);
    }

}