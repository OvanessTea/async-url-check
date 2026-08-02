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
            className={styles.button}
            style={{borderColor: isActive ? 'blue': '#ccc'}}
        >
            <div>
                <strong>
                    {job.id}
                </strong>
            </div>
            <div>
                URL: {job.urlCount}
            </div>
            <div>
                Успешно: {job.successful}
            </div>
            <div>
                Ошибок: {job.failed}
            </div>
            <div>
                {new Date(
                    job.createdAt
                ).toLocaleString()}
            </div>
        </button>
    )
}