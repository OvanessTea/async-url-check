import { create } from 'zustand';

import type {
    JobDetails,
    JobListItem
} from './types';

interface JobsState {
    jobs: JobListItem[];
    activeJobId: string | null;
    activeJob: JobDetails | null;

    jobsLoading: boolean;
    activeJobLoading: boolean;

    jobsError: string | null;
    activeJobError: string | null;

    cancelLoading: boolean;
    cancelError: string | null;

    setCancelLoading: (flag: boolean) => void;
    setCancelError: (error: string | null) => void;

    setJobs: (jobs: JobListItem[]) => void;
    setActiveJobId: (id: string | null) => void;
    setActiveJob: (job: JobDetails | null) => void;

    setJobsLoading: (flag: boolean) => void;
    setActiveJobLoading: (flag: boolean) => void;

    setJobsError: (error: string | null) => void;
    setActiveJobError: (error: string | null) => void;

    updateJob: (job: JobListItem) => void;
}

export const useJobsStore =
    create<JobsState>((set) => ({
        jobs: [],

        activeJobId: null,
        activeJob: null,

        jobsLoading: false,
        activeJobLoading: false,

        jobsError: null,
        activeJobError: null,

        cancelLoading: false,
        cancelError: null,

        setJobs: (jobs) => {
            set({ jobs });
        },

        setActiveJobId: (id) => {
            set({
                activeJobId: id,
                activeJob: null,
                activeJobError: null,
            });
        },
        setActiveJob: (job) => {
            set({
                activeJob: job,
            });
        },

        setJobsLoading: (flag) => {
            set({
                jobsLoading: flag
            })
        },

        setActiveJobLoading: (flag) => {
            set({
                activeJobLoading: flag
            })
        },

        setJobsError: (error) => {
            set({
                jobsError: error
            })
        },

        setActiveJobError: (error) => {
            set({
                activeJobError: error
            })
        },

        setCancelLoading: (flag) => {
            set({
                cancelLoading: flag
            })
        },

        setCancelError: (error) => {
            set({
                cancelError: error
            })
        },

        updateJob: (job) => {
            set((state) => ({
                jobs: state.jobs.map((item) => item.id === job.id ? job : item)
            }))
        }
    }));