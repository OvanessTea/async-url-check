import { randomUUID } from 'node:crypto';

import type { JobsRepository } from "../../modules/jobs/jobs.repository";
import type {
    Job, JobUrl,
} from '../../modules/jobs/jobs.types';


export class InMemoryJobsRepository implements JobsRepository {
    private readonly jobs = new Map<string, Job>();

    create(urls: string[]): Job {
        const job: Job = {
            id: randomUUID(),
            createdAt: new Date().toISOString(),
            status: 'pending',
            urls: urls.map((url) => ({
                id: randomUUID(),
                url,
                status: 'pending'
            }))
        };

        this.jobs.set(job.id, job);

        return job;
    }

    findAll() {
        return Array.from(this.jobs.values())
    }

    findById(id: string) {
        return this.jobs.get(id);
    }

    updateJob(
        id: string,
        data: Partial<Job>,
    ): Job | undefined {
        const job = this.jobs.get(id);

        if (!job) return undefined;

        Object.assign(job, data);

        return job;
    }

    updateUrl(
        jobId: string,
        urlId: string,
        data: Partial<JobUrl>,
    ): JobUrl | undefined {
        const job = this.jobs.get(jobId);

        if (!job) return undefined;

        const url = job.urls.find(
            (item) => item.id === urlId,
        );

        if (!url) return undefined;

        Object.assign(url, data);

        return url;
    }


    cancel(id: string): Job | undefined {
        const job = this.jobs.get(id);

        if (!job) return undefined;

        job.status = 'cancelled';

        for (const url of job.urls) {
            if (url.status === 'pending') {
                url.status = 'cancelled'
            }
        }

        return job;
    }
}