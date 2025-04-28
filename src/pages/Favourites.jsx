import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "motion/react";
import JobCard from "../componants/layout/JobCard";
import Button from "../componants/UI/Button";
import { Link } from "react-router-dom";

const Favourites = () => {
  // get jobs favourites data from store
  const favouriteJobs = useSelector((state) => state.favourites.jobs);

  return (
    <div className="bg-[#eeeeee] min-h-screen transition-colors duration-300 dark:bg-[#131313]">
      <div className="w-[90%] lg:w-[70%]  py-28 m-auto">
        <p className="text-xl lg:text-3xl font-bold p-5 mb-10 bg-blue-800 text-white">
          You have {favouriteJobs.length} Saved jobs now
        </p>
        {favouriteJobs.length <= 0 && (
          <Button className="text-white p-2 bg-blue-800">
            <Link to="/jobs">Save Some Jobs</Link>
          </Button>
        )}
        {favouriteJobs && (
          <motion.div layout>
            <AnimatePresence>
              {favouriteJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Favourites;
