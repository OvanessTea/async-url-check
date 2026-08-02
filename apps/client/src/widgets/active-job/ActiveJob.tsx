import { useActiveJob } from "@/features/active-job/useActiveJob";
import { useJobsStore } from "@/entities/job/model/store";

export function ActiveJob() {
    useActiveJob();

    const activeJob = useJobsStore((state) => state.activeJob);
    const activeJobLoading = useJobsStore((state) => state.activeJobLoading);
    const activeJobError = useJobsStore((state) => state.activeJobError);

    if (!activeJob) {
        if (activeJobLoading) {
            return (
                <div>
                    <h2>Активное задание</h2>
                    <p>
                        Загрузка...
                    </p>
                </div>
            );
        }

        return (
            <div>
                <h2>Активное задание</h2>
                <p>
                    Выберите задание
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

    return (
        <div>
            <h2>Задание {activeJob.id}</h2>
            {activeJobError && (
                <p>Ошибка: {activeJobError}</p>
            )}
            <p>Статус: {activeJob.status}</p>
            <p>
                Обработано: {processedCount}
                из {' '}{activeJob.urls.length}
            </p>

            <ul>
                {activeJob.urls.map(
                    (url) => (
                        <li key={url.url}>
                            <strong>
                                {url.url}
                            </strong>
                            {' - '}
                            {url.status}
                            {url.httpStatus &&
                                ` (${url.httpStatus})`}
                            <span style={{ color: "red" }}>{url.error &&
                                ` (${url.error})`}</span>
                        </li>
                    ),
                )}
            </ul>
        </div>
    )
}