import styles from './job-stats.module.scss';

interface Props {
    successful: number;
    failed: number;
    cancelled: number;
}

export function JobStats({
    successful,
    failed,
    cancelled
}: Props) {
    return (
        <div className={styles.stats}>
            <div className={styles.item}>
                <span className={`${styles.icon} ${styles.success}`}>
                    ✓
                </span>
                <span>
                    {successful} успешно
                </span>
            </div>
            <div className={styles.item}>
                <span className={`${styles.icon} ${styles.error}`}>
                    ✕
                </span>
                <span>
                    {failed} ошибка
                </span>
            </div>
            <div className={styles.item}>
                <span className={`${styles.icon} ${styles.cancelled}`}>
                    ⊘
                </span>
                <span>
                    {cancelled} отменено
                </span>
            </div>
        </div>
    )
}