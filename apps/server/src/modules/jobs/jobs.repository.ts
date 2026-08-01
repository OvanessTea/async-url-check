import type { Job, JobUrl } from "./jobs.types";

export interface JobsRepository {
    create(urls: string[]): Job;

    findAll(): Job[];

    findById(id: string): Job | undefined;

    updateJob(id: string, data: Partial<Job>): Job | undefined;

    updateUrl(
        jobId: string,
        urlId: string,
        data: Partial<JobUrl>,
    ): JobUrl | undefined;

    cancel(id: string): Job | undefined;
}