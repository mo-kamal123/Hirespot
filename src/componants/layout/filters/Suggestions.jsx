import JobCard from "../JobCard";
import { JobsService } from "../../../api/jobsService";
import { useMemo } from "react";

const Suggestions = ({ job, jobs }) => {
  // get jobs from store to filter Suggestions
  const suggestedJobs = useMemo(() => {
    if (Array.isArray(jobs) && jobs.length > 0 && job?.category) {
      return JobsService.getSuggestions(jobs, job.category, job.id);
    }
    return [];
  }, [jobs, job?.category]);

  return (
    <>
      {suggestedJobs.slice(0, 4).length > 0 && (
        <div className="bg-white  w-[90%] m-auto p-5">
          <p className="text-3xl mb-5">Suggestions</p>
          <div className=" grid lg:grid-cols-2 gap-5 ">
            {suggestedJobs.length > 0 &&
              suggestedJobs.map((job) => <JobCard job={job} key={job.id} />)}
          </div>
        </div>
      )}
    </>
  );
};

export default Suggestions;
