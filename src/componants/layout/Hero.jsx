import { Link } from "react-router-dom";
import { motion } from "motion/react";
import classes from "./Hero.module.css";
import Button from "../UI/Button";

const Hero = () => {
  return (
    <div
      className={` ${classes.backgroundImg} z-10 relative flex flex-col items-center justify-center h-svh `}
    >
      <div className="bg-black/60 w-full h-full absolute top-0 left-0 z-0"></div>
      <motion.div
        initial={{ opacity: 0, top: 40 }}
        animate={{ opacity: 1, top: 0, transition: { duration: 0.6 } }}
        className="lg:w-[70%] flex flex-col items-center relative z-20 "
      >
        <h1 className="text-white text-4xl lg:text-5xl m-5 ">
          Find Your Next Remote Job with Ease
        </h1>
        <p className="text-stone-400 px-5">
          Discover the perfect remote job tailored to your skills and lifestyle.
          Browse thousands of high-quality opportunities from top companies
          worldwide—all in one place. Enjoy flexible work arrangements,
          competitive salaries, and the freedom to work from anywhere. Start
          your search today and land your dream remote job faster!
        </p>
        <Button className="bg-blue-600 text-white px-2 py-2 mt-3 rounded">
          <Link to="jobs">Explore Now</Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default Hero;
