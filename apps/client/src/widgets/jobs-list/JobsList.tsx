import { useJobsStore } from '@/entities/job/model/store';
import { JobListItem } from './JobListItem';

export function JobsList() {
    const jobs = useJobsStore((state) => state.jobs);
    const activeJobId = useJobsStore((state) => state.activeJobId);
    const jobsLoading  = useJobsStore((state) => state.jobsLoading);
    const jobsError  = useJobsStore((state) => state.jobsError);
    const setActiveJobId = useJobsStore((state) => state.setActiveJobId);

    if (jobsLoading) {
        return (
            <div>
                <h2>Последние задания</h2>
                <p>Загрузка...</p>
            </div>
        )
    }

    if (jobsError) {
        return (
            <div>
                <h2>Последние задания</h2>
                <p>Не удалось загрузить задания</p>
                <p>{jobsError}</p>
            </div>
        )
    }

    if (jobs.length === 0) {
        return (
            <p>Заданий пока нет</p>
        )
    }   

    return (
        <div>
            <h2>Последние задания</h2>

            {jobs.map((job) => (
                <JobListItem
                    key={job.id}
                    job={job}
                    isActive={job.id === activeJobId}
                    onClick={() => setActiveJobId(job.id)}
                />
            ))}
        </div>
    )
}