import { useEffect } from 'react';
import { getJobs } from '@/entities/job/api/jobs-api';
import { useJobsStore } from '@/entities/job/model/store';
import { CreateJobForm } from '@/features/create-job/CreateJobForm';

function App() {
	const setJobs = useJobsStore((state) => state.setJobs);

	useEffect(() => {
		getJobs()
			.then(setJobs)
			.catch(console.error);
	}, [setJobs])

	return (
		<div>
			<h1>Job Checker</h1>
			<CreateJobForm />
		</div>
	)
}

export default App
