export const filterJobs = (jobs, jobType, location) => {
  // filter jobs based on location and job type
  const filteredjobs = jobs?.filter(
    (job) =>
      job.job_type === jobType || job.candidate_required_location === location
  );
  return filteredjobs;
};
