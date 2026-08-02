import type {
    JobDetails,
    JobListItem
} from "./types";

export function toJobListItem(
    job: JobDetails
): JobListItem {
    const successful = job.urls.filter(
        (url) => url.status === 'success',
    ).length;
    const failed = job.urls.filter(
        (url) => url.status === 'error',
    ).length;

    return {
        id: job.id,
        createdAt: job.createdAt,
        status: job.status,
        urlCount: job.urls.length,
        successful,
        failed
    }
}