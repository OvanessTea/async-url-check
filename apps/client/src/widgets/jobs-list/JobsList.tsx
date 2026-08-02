import { useJobsStore } from '@/entities/job/model/store';
import { JobListItem } from './JobListItem';
import styles from './jobs-list.module.scss';

export function JobsList() {
    const jobs = useJobsStore((state) => state.jobs);
    const activeJobId = useJobsStore((state) => state.activeJobId);
    const jobsLoading = useJobsStore((state) => state.jobsLoading);
    const jobsError = useJobsStore((state) => state.jobsError);
    const setActiveJobId = useJobsStore((state) => state.setActiveJobId);

    if (jobsLoading) {
        return (
            <div className={styles.wrapper}>
                <h2>Последние задания</h2>
                <p>Загрузка...</p>
            </div>
        )
    }

    if (jobsError) {
        return (
            <div className={styles.wrapper}>
                <h2>Последние задания</h2>
                <p>Не удалось загрузить задания</p>
                <p>{jobsError}</p>
            </div>
        )
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h2>Последние задания</h2>
                <span>
                    {jobs.length}
                </span>
            </div>
            <div className={styles.list}>
                {jobs.length === 0 ? (
                    <div className={styles.empty}>
                        Заданий пока нет
                    </div>
                ) : (
                    jobs.map((job) => (
                        <JobListItem
                            key={job.id}
                            job={job}
                            isActive={job.id === activeJobId}
                            onClick={() => setActiveJobId(job.id)}
                        />
                    ))
                )}
            </div>
        </div>
    )
}