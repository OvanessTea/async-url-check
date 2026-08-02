import styles from './job-progress.module.scss';

interface Props { 
    processed: number;
    total: number;
}

export function JobProgress({
    processed,
    total,
}: Props) {
    const percentage =
        total === 0
            ? 0
            : Math.round(
                (processed / total) * 100
            );

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <span>Прогресс</span>
                <strong>{percentage}%</strong>
            </div>
            <div
                className={styles.track}
                role='progressbar'
                aria-valuenow={percentage}
                aria-valuemin={0}
                aria-valuemax={100}
            >
                <div
                    className={styles.value}
                    style={{
                        width: `${percentage}%`
                    }}
                />
            </div>
            <span className={styles.caption}>
                {processed} из {total} завершено
            </span>
        </div>
    )
}