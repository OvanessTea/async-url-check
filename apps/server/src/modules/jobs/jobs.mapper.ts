import type { Job } from "./jobs.types";

export function toJobListItem (job: Job) {
    return {
        id: job.id,
        createdAt: job.createdAt,
        status: job.status,
        urlCount: job.urls.length,
        successful: job.urls.filter(
            (url) => url.status === 'success',
        ).length,
        failed: job.urls.filter(
            (url) => url.status === 'error',
        ).length,
    };
}

export function toJobDetails(job: Job) {
    return {
        id: job.id,
        createdAt: job.createdAt,
        status: job.status,
        urls: job.urls.map(({id, ...url}) => (url)) // hide id from url params
    }
}