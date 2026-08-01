type JobStatus = 
    | 'pending'
    | 'in_progress'
    | 'completed'
    | 'cancelled'
    | 'failed';

type UrlStatus =
    | 'pending'
    | 'in_progress'
    | 'success'
    | 'error'
    | 'cancelled'

interface Job {
    id: string;
    createdAt: string;
    status: JobStatus;
}

interface JobUrl {
    id: string;
    url: string;
    status: UrlStatus;
    httpStatus?: number;
    error?: string;
    startedAt?: string;
    finishedAt?: string;
    duration?: number;
}

export {UrlStatus, JobStatus, Job, JobUrl}