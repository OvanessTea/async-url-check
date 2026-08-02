import { useEffect } from 'react';
import { getJobs } from '@/entities/job/api/jobs-api';
import { useJobsStore } from '@/entities/job/model/store';

function App() {
	const jobs = useJobsStore((state) => state.jobs);
	const setJobs = useJobsStore((state) => state.setJobs);

	useEffect(() => {
		getJobs()
			.then(setJobs)
			.catch(console.error);
	}, [setJobs])

	return (
		<div>
			<h1>Job Checker</h1>
			<h2>Jobs</h2>
			{jobs.map((job) => (
				<div key={job.id}>
					<strong>{job.id}</strong>
					<div>Status: {job.status}</div>
					<div>URLs: {job.urlCount}</div>
				</div>
			))}
		</div>
	)
}

export default App
