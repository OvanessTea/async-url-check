import { useActiveJob } from "@/features/active-job/useActiveJob";
import { useJobsStore } from "@/entities/job/model/store";

import { JobStats } from "./JobStats";
import { JobProgress } from "./JobProgress";

import styles from './active-job.module.scss';

export function ActiveJob() {
    const { cancelActiveJob } = useActiveJob();

    const activeJob = useJobsStore((state) => state.activeJob);
    const activeJobLoading = useJobsStore((state) => state.activeJobLoading);
    const activeJobError = useJobsStore((state) => state.activeJobError);
    const cancelLoading = useJobsStore((state) => state.cancelLoading);
    const cancelError = useJobsStore((state) => state.cancelError);

    if (!activeJob) {
        return (
            <div className={styles.empty}>
                <div className={styles.emptyIcon}>
                    →
                </div>
                <h2>Активное задание</h2>
                <p>
                    Выберите задание из списка, чтобы посмотреть подробности
                </p>
            </div>
        );
    }

    const processedCount =
        activeJob.urls.filter(
            (url) =>
                url.status === 'success' ||
                url.status === 'error' ||
                url.status === 'cancelled',
        ).length;

    const successful = activeJob.urls.filter((url) => url.status === 'success').length;
    const failed = activeJob.urls.filter((url) => url.status === 'error').length;
    const cancelled = activeJob.urls.filter((url) => url.status === 'cancelled').length;

    const canCancel =
        activeJob.status === 'pending' ||
        activeJob.status === 'in_progress'

    const getStatus = (status: string) => {
        let icon = '';

        switch (status) {
            case 'success':
                icon = '✓';
                break;

            case 'error':
                icon = '✕';
                break;

            case 'pending':
                icon = '○';
                break;

            case 'in_progress':
                icon = '◌';
                break;

            case 'cancelled':
                icon = '⊘';
                break;
        }

        return (
            <span className={`${styles.status} ${styles[status]}`}>
                {icon} {status}
            </span>
        );
    };

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <div>
                    <span className={styles.label}>
                        Активное задание
                    </span>
                    <h2 className={styles.title}>
                        {activeJob.id}
                    </h2>
                </div>
                <span className={`${styles.status} ${styles[activeJob.status]}`}>
                    {activeJob.status}
                </span>
            </div>

            {activeJobLoading && (
                <div className={styles.loading}>
                    Обновление...
                </div>
            )}

            {activeJobError && (
                <div className={styles.errorLabel}>
                    {activeJobError}
                </div>
            )}

            <JobProgress
                processed={processedCount}
                total={activeJob.urls.length}
            />

            <JobStats
                successful={successful}
                failed={failed}
                cancelled={cancelled}
            />

            {canCancel && (
                <div className={styles.actions}>
                    <button
                        className={styles.cancelButton}
                        onClick={cancelActiveJob}
                        disabled={cancelLoading}
                    >
                        {cancelLoading
                            ? 'Отмена...'
                            : 'Отменить задание'
                        }
                    </button>

                    {cancelError && (
                        <span className={styles.errorText}>
                            {cancelError}
                        </span>
                    )}
                </div>
            )}
            <div className={styles.urls}>
                <div className={styles.urlsHeader}>
                    <span>URL</span>
                    <span>Статус</span>
                    <span>HTTP</span>
                </div>
                {activeJob.urls.map((url) => (
                    <div className={styles.urlRow} key={url.url}>
                        <span className={styles.url} title={url.url}>
                            {url.url}
                        </span>
                        {getStatus(url.status)}
                        <span>
                            {url.httpStatus ?? '-'}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}