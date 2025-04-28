const main_url = "https://remotive.com/api/remote-jobs";

export const JobsService = {
  getAllJobs: async () => {
    const response = await fetch(main_url + "?limit=50");
    if (!response.ok) throw new Error("failed to fetch jobs");
    const data = await response.json();
    return data.jobs;
  },
  getAllCategories: async () => {
    const response = await fetch(main_url + "/categories");
    if (!response.ok) throw new Error("failed to fetch categories");
    const data = await response.json();
    return data.jobs;
  },
  getSearchedJobs: async (search) => {
    const response = await fetch(`${main_url}?search=${search}&limit=50`);
    if (!response.ok) throw new Error(`failed to fetch (${search}) jobs`);
    const data = await response.json();
    return data.jobs;
  },
  getJobsByCategory: async (category) => {
    const response = await fetch(`${main_url}?category=${category}&limit=50`);
    if (!response.ok) throw new Error(`failed to fetch (${category}) jobs`);
    const data = await response.json();
    return data.jobs;
  },
  getSuggestions: (jobs, category, id) => {
    const suggstedJobs = jobs.filter((job) => job.category == category && job.id !== id );
    if (!suggstedJobs) throw new Error(`there are no suggetions now`);
    return suggstedJobs;
  },
  getSingleJob: (jobs, id) => {
    const job = jobs.find((job) => job.id == id);
    if (!job) throw new Error(`this ${id} not found`);
    return job;
  },
};
