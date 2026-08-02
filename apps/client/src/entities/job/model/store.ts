import { create } from 'zustand';

import type {
    JobDetails,
    JobListItem
} from './types';

interface JobsState {
    jobs: JobListItem[];
    activeJobId: string | null;
    activeJob: JobDetails | null;
    setJobs: (jobs: JobListItem[]) => void;
    setActiveJobId: (id: string | null) => void;
    setActiveJob: (job: JobDetails | null) => void;
}

export const useJobsStore =
    create<JobsState>((set) => ({
        jobs: [],
        activeJobId: null,
        activeJob: null,
        setJobs: (jobs) => {
            set({ jobs });
        },
        setActiveJobId: (id) => {
            set({
                activeJobId: id,
                activeJob: null,
             });
        },
        setActiveJob: (job) => {
            set({ 
                activeJob: job,
             });
        },
    }));