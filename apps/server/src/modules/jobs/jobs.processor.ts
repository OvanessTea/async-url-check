import { JobsRepository } from "./jobs.repository";
import { Job } from "./jobs.types";
import { UrlChecker } from "./url-checker";

const MAX_CONCURRENCY = 5; // Max urls checking in a row
const MAX_DELAY_MS = 10_000; // Max url check delay

function delay(ms: number) : Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    })
}

function randomDelay(): Promise<void> {
    const ms = Math.floor(
        Math.random() * (MAX_DELAY_MS + 1),
    );

    return delay(ms);
}

export class JobsProcessor {
    constructor(
        private readonly repository: JobsRepository,
        private readonly urlChecker: UrlChecker,
    ) {}

    async process(jobId: string): Promise<void> {
        const job = this.repository.findById(jobId);

        if (!job || job.status == 'cancelled') return;

        this.repository.updateJob(jobId, {
            status: 'in_progress',
        });

        await this.processWithConcurrency(job);

        this.finalizeJob(jobId);
    }

    private async processWithConcurrency(
        job: Job
    ): Promise<void> {
        let nextIndex = 0;

        const worker = async (): Promise<void> => {
            while (true) {
                const currentJob =
                    this.repository.findById(job.id);

                if (!currentJob || currentJob.status === 'cancelled') return;
                
                const nextUrl = currentJob.urls[nextIndex++];
                
                if (!nextUrl) return;

                await this.processUrl(
                    job.id,
                    nextUrl.id,
                )
            }
        };

        const workers = Array.from(
            {
                length: Math.min(
                    MAX_CONCURRENCY,
                    job.urls.length,
                ),
            },
            () => worker()
        ); // Number of workers: 5 or below
        // Could check several Jobs with their workers in parallel

        await Promise.all(workers);
    }

    private async processUrl(
        jobId: string,
        urlId: string,
    ): Promise<void> {
        const job = this.repository.findById(jobId);

        if (!job || job.status === 'cancelled') return;

        const url = job.urls.find(
            (item) => item.id === urlId
        )

        if (!url || url.status !== 'pending') {
            return;
        }

        const startedAt = new Date();

        this.repository.updateUrl(jobId, urlId, {
            status: 'in_progress',
            startedAt: startedAt.toISOString(),
        });

        const result = await this.urlChecker.check(url.url);

        await randomDelay(); // call rand delay for mocking process

        const finishedAt = new Date();

        this.repository.updateUrl(jobId, urlId, {
            status: result.status,
            httpStatus: result.httpStatus,
            error: result.error,
            finishedAt: finishedAt.toISOString(),
            duration:
                finishedAt.getTime() -
                startedAt.getTime(),
        });
    }

    private finalizeJob(jobId: string): void {
        const job = this.repository.findById(jobId);

        if (!job) return;

        if (job.status === 'cancelled') return;

        const hasPending = job.urls.some(
            (url) => url.status === 'pending'
        )

        const hasInProgress = job.urls.some(
            (url) => url.status === 'in_progress'
        )

        const hasErrors = job.urls.some(
            (url) => url.status === 'error'
        )

        if (hasPending || hasInProgress) {
            this.repository.updateJob(jobId, {
                status: 'in_progress'
            });

            return;
        }

        this.repository.updateJob(jobId, {
            status: hasErrors
                ? 'failed'
                : 'completed'
        })
    } 
}