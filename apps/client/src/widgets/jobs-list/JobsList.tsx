import {
    getJob,
} from '@/entities/job/api/jobs-api';
import { useJobsStore } from '@/entities/job/model/store';
import { JobListItem } from './JobListItem';

export function JobsList() {
    const jobs = useJobsStore((state) => state.jobs);
    const activeJobId = useJobsStore((state) => state.activeJobId);
    const setActiveJob = useJobsStore((state) => state.setActiveJob);
    const setActiveJobId = useJobsStore((state) => state.setActiveJobId);

    const handleSelect = async (id: string) => {
        setActiveJobId(id);
        const job = await getJob(id);
        setActiveJob(job);
    };

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
                    onClick={() => handleSelect(job.id)}
                />
            ))}
        </div>
    )
}