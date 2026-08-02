import { type CreateJobInput, createJobSchema} from "./CreateJobSchema";
import { useForm } from 'react-hook-form';
import { createJob, getJobs } from "@/entities/job/api/jobs-api";
import { useJobsStore } from "@/entities/job/model/store";
import { zodResolver } from '@hookform/resolvers/zod';

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
        <form onSubmit={handleSubmit(onSubmit)}>
            <textarea
                {...register('urls')}
                placeholder={
                    'https://google.com\nhttps://github.com'
                }
                rows={8}
            />

            {errors.urls && (
                <p>{errors.urls.message}</p>
            )}

            <button type="submit" disabled={isSubmitting || !!errors.urls}>
                {isSubmitting
                    ? 'Запуск...'
                    : 'Запустить проверку'
                }
            </button>
        </form>
    );
}