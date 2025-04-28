import { useQuery } from "@tanstack/react-query";
import { JobsService } from "../api/jobsService";

export const useJobsQuery = (search, category, enabled = true, options) => {
  // fetch all jobs data based on searchterm or category  
  return useQuery({
    queryKey: ["jobs", search, category],
    queryFn: () => {
      if (search) {
        return JobsService.getSearchedJobs(search);
      } else if (category) {
        return JobsService.getJobsByCategory(category);
      } else {
        return JobsService.getAllJobs();
      }
    },
    staleTime: 1000 * 60 * 5,

    enabled,

    ...options,
  });
};
