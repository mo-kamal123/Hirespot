import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import Home from "../pages/Home";
// import Jobs{ loader as Jobsloader } from "../pages/Jobs";
import Jobs from "../pages/Jobs";
import JobDetails from "../pages/JobDetails";
import Favourites from "../pages/Favourites";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "jobs", element: <Jobs /> },
      { path: "/jobs/:jobId", element: <JobDetails /> },
      { path: "favourites", element: <Favourites /> },
    ],
  },
]);
