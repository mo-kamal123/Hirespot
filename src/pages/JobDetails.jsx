import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { JobsService } from "../api/jobsService";
import { addJobToFav } from "../store/FavSlice/fav-slice";
import { useJobsQuery } from "../hooks/useJobsQuery";
import { replaceJobs } from "../store/JobsSlice/jobs-slice";
import Suggestions from "../componants/layout/filters/Suggestions";
import Spinner from "../componants/UI/Spinner";
import Error from "../componants/UI/Error";
import Button from "../componants/UI/Button";
import { formatDate } from "../utils/formatDate";
import { motion } from "motion/react";

const JobDetails = () => {
  const { jobId } = useParams();
  const dispatch = useDispatch();

  // get job details from store and check if it exist or not
  const storedJobs = useSelector((state) => state.jobs.jobs);
  const isDataInStore = Array.isArray(storedJobs) && storedJobs.length > 0;

  // fetch if not stored
  const {
    data: updatedJobs,
    isLoading,
    isError,
    error,
  } = useJobsQuery(undefined, undefined, !isDataInStore, {
    onSuccess: (data) => {
      if (data && Array.isArray(data)) {
        // update data after fetch it
        dispatch(replaceJobs(data));
      }
    },
  });

  // use stored jobs first, if not updated ones
  const jobs = isDataInStore ? storedJobs : updatedJobs;

  // get single job data after fetching
  const job = useMemo(() => {
    if (Array.isArray(jobs) && jobs.length > 0) {
      return JobsService.getSingleJob(jobs, jobId);
    }
    return null;
  }, [jobs, jobId]);

  // get favourites from store and check if this job favourite or not
  const favourites = useSelector((state) => state.favourites.jobs);
  const isFav = favourites?.find((favjob) => favjob?.id === job?.id);

  // toggle fav
  const handleAddToFav = (job) => {
    dispatch(addJobToFav(job));
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <div className="w-full h-screen flex items-center justify-center pt-24">
        <Error message={error.message} style={"text-6xl text-red-400"} />
      </div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
        className="bg-[#ededed] flex flex-col gap-5 min-h-screen pt-24 transition-colors duration-300 dark:bg-[#131313]"
      >
        {/* job card  */}
        <div className="bg-white flex flex-col gap-2 w-[90%] m-auto p-5 dark:bg-[#2d2d2d] dark:text-white">
          <div className="flex justify-between">
            <h2 className="lg:text-3xl text-xl font-bold">{job.title}</h2>
            <img
              className="w-18"
              src={
                job.company_logo ||
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAflBMVEX///8AAABzc3N3d3eTk5OJiYmjo6O4uLj39/dAQEDt7e36+vpSUlIfHx/09PTHx8fZ2dlLS0tkZGRXV1coKCjAwMCurq4aGhrk5ORpaWmcnJzg4OBubm6Li4sjIyMYGBgvLy8LCws9PT2pqanR0dGzs7NdXV01NTUQEBB+fn6R6MuhAAAFCUlEQVR4nO2dbXeiOhRGnaoVfENQKqijVRHr//+D9w5Rh8Rk8IQoiT77U9c6Kcm21uSEQ2y1AAAAAAAAAAAAAAAAABhl2W2bpLtsWkhk8ss0k6aVBDrGDTtNKwl0jRt2m1YSeBNDf9ExwcK31rBt6GJtaw0/DF3sA4ZNAEMSMGyENzP09tJ5Lr62jqXxvXcOW284jhTLlMtSU7WIjcYsbr1hoFqIfSdFPPlWNQjYBaw37KkERiwjmoxUDXrsAjBshBvD9QeXs6dbwXCbcvGPtXOGQ4+LJ3PBcJ5wcW8Iw6aBIQxh2DwwhCEMmweGMHTRcMDFqwwH7hn6cVDmsBEMNwcuHvvOGcp4rQz4pQ1jlcD6bLhWNTjvN1pvuFQZTNlu4XiqegXO5QnWG7YCfyYjutRXLCNp3D9vJjpg2Bp4MkrNpfHr/OKAYU1g2AjCu3Qs4+8qpyJuv2Gwm49umI/y6ydNPpI12DnzSbNUzejD82wxVMRHrswWyhl/9Coz/uuv2pjhlmS4dc/QD7IyvZvsqcfFA/eyp9fPgG3fxZBPyWoGJ+OGJ/IYKIJBHhKZGTecUYeQB627mWxUH+f/xqghnc39peF7vR6aNvy1v9vw01HDTxjyhsOYQBAZN4wCygCGGobp3c3/8Nu44W9S/6mOIWl+aXjGH8BQAIYS3tBwveKItoLhNuIb1Kvca8JQxuNyfBiK1DRsoApaz9Ab3A9fyZ4qBKoq2VO+kp3Qv6djuJ4SyL9Lhq3B10JG6WkEafzr8q4pDL9zygDWGoYaGL1voQEMYXi/4SD+lLDPrh1ke1mDmPs/fLxh+EXgkJcMvXbFCFSvYNsrGeYHygBCDUP9/NDMfGh9fijjZdY0b2I4H3KEW8FwG/IN5s4ZTvl4fyQYjvp8g6lzhq+fAcMQhjDkgaFIYbii9ND4rv5Kw3AWEUiPxg2PKWUAMw1DDRy7uwZDGNpvuOsQTu5aDG8M69ZEDSndd3YahjXvAYeTZYkkuDEMknKDSSgaIsfnQI4vAkMJXJ23qmisqs57o13n/WTDVm92W4n/P/5lSzgLpfHZ+U/ogGHL6ye3lDdmpPHrDOqAYU1geAsMRd7EUD/Hr82TcvzjqUsgNG4YUro/HTUMNfhrSCijKBV0cIYaPM8w/tH69Z9LsYb1hsqn86rgns7T4Lk5vhbPzfGP7RMB37ihT+m+rfNJUzPHr234+NmiZn4YZpNbWA1DIIlkN7sYNq9pZDtRjH5h2JdEaj6dZ8GdGYba0P17TwwYwlAJDEVgKAGGDMsMKT1U3sdnUAwfv2rzF7I6XhVT44ZTSvfsy3cavUNKN9QAhjB8OUP9p4LMGD7+qSCzVV90Q+tzfBdmfBhywJABQxgqgaEIDCXAkGGZIaWHxldtOoZhj0BcdYoS3TCKKQPQeUpWA8eyJxjC0H7DH+nJ8Co2xg03pP5/NAyR4/M4OePDkAOGDBjCUAkMRV7fsDgpWSM/bLOfa1d9FWcUaeSHd56UPJhkxfHjw4BAVvSQZ8XPxYFzwreSMVjVYk8SYd9K1mEXKI5kSjPKAIoX6JRN7njjeavipBhHma9k/xw8h6YHWZNDpaHqTENX6MCQGW58F5kTDPNx3z3GOcEwqmxmIxEMGTC0GBiegaHFUAxpmZMtpATDHeFsGGtY7AiGDgND/ftOtlC9V5M0PcSaJJWGraTbdpfuHYIAAAAAAAAAAAAAAADwpvwHx5YldL+bedUAAAAASUVORK5CYII="
              }
              alt="logo"
            />
          </div>
          <p className="bg-gray-300 text-sm w-fit p-[2px] mt-2 rounded dark:bg-neutral-600">
            {job.job_type}
          </p>
          <p className="font-bold">company: {job.company_name}</p>
          <p className="font-bold">
            candidates must be from {job.candidate_required_location}
          </p>
          <p className="">Date: {formatDate(job.publication_date)}</p>
          <div className="flex items-center justify-between mt-4 gap-4">
            <div className="flex flex-col-reverse lg:flex-row lg:items-center gap-4">
              <div className="flex items-center gap-4">
                <Link
                  target="_blank"
                  to={job.url}
                  className="bg-blue-600 text-white px-4 py-2"
                >
                  Apply For Job
                </Link>
                <Button
                  onClick={() => handleAddToFav(job)}
                  className={`text-2xl ${
                    isFav ? "text-red-500" : "text-black dark:text-white"
                  } `}
                >
                  {isFav ? (
                    <i class="fa-solid fa-heart"></i>
                  ) : (
                    <i class="fa-regular fa-heart"></i>
                  )}
                </Button>
              </div>
              {job.salary && (
                <p className="block lg:text-3xl font-bold">
                  Salary:{job.salary}
                </p>
              )}
            </div>
          </div>
        </div>
        {/* job description  */}
        <div className="bg-white flex flex-col gap-2 w-[90%] m-auto p-5 dark:bg-[#2d2d2d] dark:text-white">
          <div>
            <h3 className="text-xl font-bold"> job description </h3>
            <p
              dangerouslySetInnerHTML={{ __html: job.description }}
              className="mt-3 "
            ></p>
          </div>
          <div>
            <h3 className="text-xl font-bold"> Category </h3>
            <p className="mt-3 bg-gray-200 w-fit p-1 rounded dark:bg-neutral-600">
              {job.category}
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold"> Tags </h3>
            <p className="mt-3 flex gap-3 items-center">
              {job.tags?.map((tag) => (
                <p
                  className="bg-gray-200 w-fit p-1 rounded dark:bg-neutral-600"
                  key={tag}
                >
                  {tag}
                </p>
              ))}
            </p>
          </div>
        </div>
        {/* Suggestions  */}
        <div className="pb-5">
          {job && <Suggestions job={job} jobs={jobs} />}
        </div>
      </motion.div>
    </>
  );
};

export default JobDetails;
