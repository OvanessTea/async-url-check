import { useEffect } from "react";
import { getJob } from "@/entities/job/api/jobs-api";
import { useJobsStore } from "@/entities/job/model/store";
import { toJobListItem } from "@/entities/job/model/mappers";

const POLLING_INTERVAL = 1000;

export function useActiveJob() {
    const activeJobId = useJobsStore((state) => state.activeJobId);
    const setActiveJob = useJobsStore((state) => state.setActiveJob);
    const setActiveJobLoading = useJobsStore((state) => state.setActiveJobLoading);
    const setActiveJobError = useJobsStore((state) => state.setActiveJobError);
    const updateJob = useJobsStore((state) => state.updateJob);

    useEffect(() => {
        if (!activeJobId) return;

        const controller = new AbortController();
        let cancelled = false;
        let timeoutId: number | undefined;

        const poll = async () => {
            try {
                const job = await getJob(activeJobId, controller.signal);

                if (cancelled) return;

                setActiveJob(job);
                updateJob(
                    toJobListItem(job)
                );
                setActiveJobLoading(false);
                setActiveJobError(null);

                const isFinished =
                    job.status === 'completed' ||
                    job.status === 'failed' ||
                    job.status === 'cancelled';

                if (isFinished) return;

                timeoutId = window.setTimeout(poll, POLLING_INTERVAL);

            } catch (error) {
                if (cancelled) {
                    return;
                }

                if (
                    error instanceof DOMException &&
                    error.name === 'AbortError'
                ) {
                    return;
                }

                const message =
                    error instanceof Error
                        ? error.message
                        : 'Неизвестная ошибка';

                setActiveJobLoading(false);
                setActiveJobError(message);
            }
        };

        setActiveJobLoading(true);
        setActiveJobError(null);

        poll();

        return () => {
            cancelled = true;
            controller.abort();

            if (timeoutId) {
                window.clearTimeout(timeoutId);
            }
        };
    }, [
        activeJobId,
        setActiveJob,
        setActiveJobLoading,
        setActiveJobError
    ]);
}