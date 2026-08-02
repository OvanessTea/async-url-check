export type JobStatus = 
    | 'pending'
    | 'in_progress'
    | 'completed'
    | 'cancelled'
    | 'failed';

export type JobUrlStatus = 
    | 'pending'
    | 'in_progress'
    | 'success'
    | 'error'
    | 'cancelled';

export interface JobListItem { 
    id: string;
    createdAt: string;
    status: JobStatus;
    urlCount: number;
    successful: number;
    failed: number;
}

export interface JobUrl {
    url: string;
    status: JobUrlStatus;
    httpStatus?: number;
    error?: string;
    startedAt?: string;
    finishedAt?: string;
    duration?: number;
}

export interface JobDetails {
    id: string;
    createdAt: string;
    status: JobStatus;
    urls: JobUrl[];
}