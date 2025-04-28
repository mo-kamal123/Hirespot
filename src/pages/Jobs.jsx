import { useState } from "react";
import { useJobsQuery } from "../hooks/useJobsQuery";
import { usePagination } from "../hooks/usePagination";
import { useDispatch } from "react-redux";
import { replaceJobs } from "../store/JobsSlice/jobs-slice";
import Filterbar from "../componants/layout/filters/Filterbar";
import JobCard from "../componants/layout/JobCard";
import SerachBar from "../componants/UI/SerachBar";
import Actions from "../componants/layout/filters/Actions";
import Error from "../componants/UI/Error";
import Spinner from "../componants/UI/Spinner";

const Jobs = () => {
  // get loaders data
  // const {jobs} = useLoaderData()
  const dispatch = useDispatch();

  // search & filtering handling
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [checkedCategory, setCheckedCategory] = useState("");
  const [filtering, setFiltering] = useState({ type: "", location: "" });

  // all jobs data
  const {
    data: jobs,
    isLoading,
    isError,
    error,
  } = useJobsQuery(searchTerm, checkedCategory, true, {
    onSuccess: (data) => {
      if (data && Array.isArray(data)) {
        dispatch(replaceJobs(data));
      }
    },
  });

  // paginate data
  const { page, pageJobs, setPage } = usePagination(jobs, filtering);
  console.log(pageJobs);
  // search handleing functions
  const handleSearch = () => {
    setSearchTerm(searchInput);
  };
  const onClick = (e) => {
    e.preventDefault();
    handleSearch();
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  // change category function
  const handleSelectedCategory = (category) => {
    if (category === checkedCategory) {
      setCheckedCategory("");
    } else {
      setCheckedCategory(category);
    }
  };

  // filtering functions
  const handleFiltering = (name, value) => {
    setFiltering((prev) => {
      if (prev[name] === value) {
        return { ...prev, [name]: "" };
      } else {
        return { ...prev, [name]: value };
      }
    });
  };

  // pagination functions
  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };
  const handleNextPage = () => {
    if (page < jobs.length / 10) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className=" bg-[#eeeeee] min-h-svh transition-colors duration-300 dark:bg-[#131313]">
      <div className="flex flex-col gap-4 items-center pt-24 pb-5  bg-blue-900">
        <p className="text-3xl text-white">All Available jobs</p>
        <SerachBar
          onChange={(e) => setSearchInput(e.target.value)}
          onClick={onClick}
          onKeyPress={handleKeyPress}
        />
      </div>
      <div className="w-[90%] m-auto mt-10  justify-between gap-8 flex">
        <Filterbar
          filtering={filtering}
          onFiltering={handleFiltering}
          checked={checkedCategory}
          handleSelectedCategory={handleSelectedCategory}
        />
        <div className="w-full grid grid-cols-1 gap-5">
          {isLoading && <Spinner />}

          {jobs && pageJobs.map((job) => <JobCard key={job.id} job={job} />)}

          {(!pageJobs || pageJobs.length === 0) && (
            <div className="flex items-center justify-center">
              <p className="text-5xl font-bold text-center text-neutral-400">
                Jobs not Available Now{" "}
              </p>
            </div>
          )}

          {isError && <Error message={error.message} />}
        </div>
      </div>
      {/* Actions buttons  */}
      {(pageJobs && pageJobs.length > 0) && (
        <Actions
          nextPage={handleNextPage}
          prevPage={handlePrevPage}
          page={page}
        />
      )}
    </div>
  );
};

export default Jobs;

// get data using loader

// export const loader = async () => {
//   return await JobsService.getAllJobs()
// }
