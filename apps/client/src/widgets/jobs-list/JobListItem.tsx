import type { JobListItem as JobListItemType } from "@/entities/job/model/types";
import styles from './jobs-list.module.scss'
interface Props {
    job: JobListItemType;
    isActive: boolean;
    onClick: () => void;
};

export function JobListItem({
    job, 
    isActive,
    onClick
}: Props) {
    return (
        <button 
            onClick={onClick} 
            className={`${styles.item} ${isActive ? styles.active : ''}`}
        >
            <div className={styles.itemHeader}>
                <span className={`${styles.dot} ${styles[job.status]}`}/>
                <span className={styles.status}>
                    {job.status}
                </span>
                <span className={styles.date}>
                    {new Date(job.createdAt)
                        .toLocaleTimeString(
                            'ru-RU',
                            {
                                hour: '2-digit',
                                minute: '2-digit'
                            }
                        )
                    }
                </span>
            </div>
            <div className={styles.id}>
                {job.id}
            </div>
            <div className={styles.stats}>
                <span>{job.urlCount} URL</span>
                <span>✓ {job.successful}</span>
                <span>✕ {job.failed}</span>
            </div>
        </button>
    )
}