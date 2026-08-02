import { useEffect } from 'react';
import { getJobs } from '@/entities/job/api/jobs-api';
import { useJobsStore } from '@/entities/job/model/store';
import { CreateJobForm } from '@/features/create-job/CreateJobForm';
import { JobsList } from '@/widgets/jobs-list/JobsList';
import { ActiveJob } from '@/widgets/active-job/ActiveJob';

function App() {
	const setJobs = useJobsStore((state) => state.setJobs);
	const setJobsLoading = useJobsStore((state) => state.setJobsLoading);
	const setJobsError = useJobsStore((state) => state.setJobsError);

	useEffect(() => {
		const loadJobs = async () => {
			try {
				setJobsLoading(true);
				setJobsError(null);

				const jobs = await getJobs();

				setJobs(jobs);
			} catch (error) {
				const message =
					error instanceof Error
						? error.message
						: 'Неизвестная ошибка'

				setJobsError(message)
			} finally {
				setJobsLoading(false)
			}
		};

		loadJobs()
	}, [
		setJobs, 
		setJobsError,
		setJobsLoading
	])

	return (
		<div>
			<h1>Job Checker</h1>
			<CreateJobForm />
			<hr />
			<JobsList/>
			<hr />
			<ActiveJob/>
		</div>
	)
}

export default App
