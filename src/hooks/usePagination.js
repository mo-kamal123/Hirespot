import { useState } from "react";
import { filterJobs } from "../utils/filterJobs";

export const usePagination = (jobs, {type, location}) => {
    // get all jobs data and return array of 10 jobs for every page 
    const [page, setPage] = useState(1)
    const filteredjobs = filterJobs( jobs, type, location )
    const source = type || location ? filteredjobs : jobs
    const pageJobs = source?.slice((page - 1) * 10, page * 10)

    return { page, pageJobs, setPage}
}