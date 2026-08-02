import { apiClient } from "@/shared/api/api-client";

import type {
    JobDetails,
    JobListItem
} from '../model/types';

interface CreateJobResponse {
    jobId: string;
}

export async function getJobs(): Promise<JobListItem[]> {
    return apiClient<JobListItem[]>('/jobs');
}

export async function getJob(
    id: string
): Promise<JobDetails> {
    return apiClient<JobDetails>(
        `/jobs/${id}`
    );
}

export async function createJob(
    urls: string[],
): Promise<CreateJobResponse> {
    return apiClient<CreateJobResponse>(
        '/jobs',
        {
            method: 'POST',
            body: JSON.stringify({ urls })
        },
    );
}

export async function cancelJob(
    id: string,
): Promise<void> {
    return apiClient<void>(
        `/jobs/${id}`,
        {
            method: 'DELETE'
        },
    );
}