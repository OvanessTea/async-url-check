import { useEffect } from 'react';
import { getJobs } from '@/entities/job/api/jobs-api';
import { useJobsStore } from '@/entities/job/model/store';
import { CreateJobForm } from '@/features/create-job/CreateJobForm';
import { JobsList } from '@/widgets/jobs-list/JobsList';
import { ActiveJob } from '@/widgets/active-job/ActiveJob';

import styles from './app.module.scss';

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
		<div className={styles.app}>
			<header className={styles.header}>
				<div>
					<h1>URL Checker</h1>
					<p>Проверка доступности URL</p>
				</div>
				<span className={styles.status}>
					<span className={styles.statusDot}/>
					Online
				</span>
			</header>
			<main className={styles.layout}>
				<div className={styles.sidebar}>
					<CreateJobForm />
					<JobsList/>
				</div>
				<div className={styles.content}>
					<ActiveJob/>
				</div>
			</main>
		</div>
	)
}

export default App
