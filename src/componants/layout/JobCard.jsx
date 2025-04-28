import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { addJobToFav } from "../../store/FavSlice/fav-slice";
import Button from "../UI/Button";

const JobCard = ({ job }) => {
  const dispatch = useDispatch();
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.5, y: -50 },
  };

  // toggle favourites
  const handleAddToFav = (job) => {
    dispatch(addJobToFav(job));
  };

  // get favourites from store and check if this job favourite or not
  const favourites = useSelector((state) => state.favourites.jobs);
  const isFav = favourites?.find((favjob) => favjob?.id === job?.id);

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.4 },
      }}
      transition={{ duration: 0.4 }}
      className=" p-4 border-[1px] max-h-fit mt-5 border-[#b7b7b7] bg-white rounded dark:bg-[#1e1e1e] transition-colors duration-300 dark:text-white"
    >
      {job && (
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <Link
              to={`/jobs/${job.id}`}
              className="lg:text-xl font-bold text-blue-700 dark:text-blue-400"
            >
              {job.title}
            </Link>
            <p className="text-sm lg:text-base">Company: {job.company_name}</p>
            <p className="bg-gray-300 text-sm w-fit px-[4px] pt-[3px] mt-2 rounded dark:bg-neutral-500">
              {job.job_type}
            </p>
            <div className="flex gap-5 mt-2">
              <Button>
                <Link
                  to={`/jobs/${job.id}`}
                  className="bg-blue-600 hover:bg-blue-800 transition-all duration-300 text-white px-4 py-2 "
                >
                  View details
                </Link>
              </Button>
              <Button
                onClick={() => handleAddToFav(job)}
                className={`text-2xl transition-colors ${
                  isFav ? "text-red-600" : ""
                }`}
              >
                {isFav ? (
                  <i className="fa-solid fa-heart"></i>
                ) : (
                  <i className="fa-regular fa-heart"></i>
                )}
              </Button>
            </div>
          </div>
          <img className="w-18" src={job.company_logo || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAflBMVEX///8AAABzc3N3d3eTk5OJiYmjo6O4uLj39/dAQEDt7e36+vpSUlIfHx/09PTHx8fZ2dlLS0tkZGRXV1coKCjAwMCurq4aGhrk5ORpaWmcnJzg4OBubm6Li4sjIyMYGBgvLy8LCws9PT2pqanR0dGzs7NdXV01NTUQEBB+fn6R6MuhAAAFCUlEQVR4nO2dbXeiOhRGnaoVfENQKqijVRHr//+D9w5Rh8Rk8IQoiT77U9c6Kcm21uSEQ2y1AAAAAAAAAAAAAAAAABhl2W2bpLtsWkhk8ss0k6aVBDrGDTtNKwl0jRt2m1YSeBNDf9ExwcK31rBt6GJtaw0/DF3sA4ZNAEMSMGyENzP09tJ5Lr62jqXxvXcOW284jhTLlMtSU7WIjcYsbr1hoFqIfSdFPPlWNQjYBaw37KkERiwjmoxUDXrsAjBshBvD9QeXs6dbwXCbcvGPtXOGQ4+LJ3PBcJ5wcW8Iw6aBIQxh2DwwhCEMmweGMHTRcMDFqwwH7hn6cVDmsBEMNwcuHvvOGcp4rQz4pQ1jlcD6bLhWNTjvN1pvuFQZTNlu4XiqegXO5QnWG7YCfyYjutRXLCNp3D9vJjpg2Bp4MkrNpfHr/OKAYU1g2AjCu3Qs4+8qpyJuv2Gwm49umI/y6ydNPpI12DnzSbNUzejD82wxVMRHrswWyhl/9Coz/uuv2pjhlmS4dc/QD7IyvZvsqcfFA/eyp9fPgG3fxZBPyWoGJ+OGJ/IYKIJBHhKZGTecUYeQB627mWxUH+f/xqghnc39peF7vR6aNvy1v9vw01HDTxjyhsOYQBAZN4wCygCGGobp3c3/8Nu44W9S/6mOIWl+aXjGH8BQAIYS3tBwveKItoLhNuIb1Kvca8JQxuNyfBiK1DRsoApaz9Ab3A9fyZ4qBKoq2VO+kp3Qv6djuJ4SyL9Lhq3B10JG6WkEafzr8q4pDL9zygDWGoYaGL1voQEMYXi/4SD+lLDPrh1ke1mDmPs/fLxh+EXgkJcMvXbFCFSvYNsrGeYHygBCDUP9/NDMfGh9fijjZdY0b2I4H3KEW8FwG/IN5s4ZTvl4fyQYjvp8g6lzhq+fAcMQhjDkgaFIYbii9ND4rv5Kw3AWEUiPxg2PKWUAMw1DDRy7uwZDGNpvuOsQTu5aDG8M69ZEDSndd3YahjXvAYeTZYkkuDEMknKDSSgaIsfnQI4vAkMJXJ23qmisqs57o13n/WTDVm92W4n/P/5lSzgLpfHZ+U/ogGHL6ye3lDdmpPHrDOqAYU1geAsMRd7EUD/Hr82TcvzjqUsgNG4YUro/HTUMNfhrSCijKBV0cIYaPM8w/tH69Z9LsYb1hsqn86rgns7T4Lk5vhbPzfGP7RMB37ihT+m+rfNJUzPHr234+NmiZn4YZpNbWA1DIIlkN7sYNq9pZDtRjH5h2JdEaj6dZ8GdGYba0P17TwwYwlAJDEVgKAGGDMsMKT1U3sdnUAwfv2rzF7I6XhVT44ZTSvfsy3cavUNKN9QAhjB8OUP9p4LMGD7+qSCzVV90Q+tzfBdmfBhywJABQxgqgaEIDCXAkGGZIaWHxldtOoZhj0BcdYoS3TCKKQPQeUpWA8eyJxjC0H7DH+nJ8Co2xg03pP5/NAyR4/M4OePDkAOGDBjCUAkMRV7fsDgpWSM/bLOfa1d9FWcUaeSHd56UPJhkxfHjw4BAVvSQZ8XPxYFzwreSMVjVYk8SYd9K1mEXKI5kSjPKAIoX6JRN7njjeavipBhHma9k/xw8h6YHWZNDpaHqTENX6MCQGW58F5kTDPNx3z3GOcEwqmxmIxEMGTC0GBiegaHFUAxpmZMtpATDHeFsGGtY7AiGDgND/ftOtlC9V5M0PcSaJJWGraTbdpfuHYIAAAAAAAAAAAAAAADwpvwHx5YldL+bedUAAAAASUVORK5CYII='} alt="logo" />
        </div>
      )}
    </motion.div>
  );
};

export default JobCard;
