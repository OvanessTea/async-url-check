import { type CreateJobInput, createJobSchema } from "./CreateJobSchema";
import { useForm } from 'react-hook-form';
import { createJob, getJobs } from "@/entities/job/api/jobs-api";
import { useJobsStore } from "@/entities/job/model/store";
import { zodResolver } from '@hookform/resolvers/zod';

import styles from './create-job-form.module.scss';

export function CreateJobForm() {
    const setActiveJobId = useJobsStore((state) => state.setActiveJobId);
    const setJobs = useJobsStore((state) => state.setJobs);

    const {
        register,
        handleSubmit,
        formState: {
            isSubmitting,
            errors
        },
        reset
    } = useForm<CreateJobInput>({
        resolver: zodResolver(createJobSchema),
        defaultValues: {
            urls: ''
        },
    });

    const onSubmit = async (values: CreateJobInput) => {
        const urls = values.urls
            .split('\n')
            .map((url) => url.trim())
            .filter(Boolean);

        const { jobId } = await createJob(urls);
        const jobs = await getJobs();

        setJobs(jobs);
        setActiveJobId(jobId);
        reset();
    }

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <div>
                    <h2>
                        Новая проверка
                    </h2>
                    <p>
                        Каждый URL с новой строки
                    </p>
                </div>
            </div>
            <form
                className={styles.form}
                onSubmit={handleSubmit(onSubmit)}
            >
                <textarea
                    {...register('urls')}
                    placeholder={
                        'https://google.com\nhttps://github.com'
                    }
                    rows={8}
                />

                <div className={styles.footer}>
                    {errors.urls && (
                        <span>{errors.urls.message}</span>
                    )}
                    <button type="submit" disabled={isSubmitting || !!errors.urls}>
                        {isSubmitting
                            ? 'Запуск...'
                            : 'Запустить проверку'
                        }
                    </button>
                </div>
            </form>
        </div>
    );
}