import { useQuery } from "@tanstack/react-query";
import { JobsService } from "../api/jobsService";

export const useCategoriesQuery = () => {
    // get all Categories from api 
    return useQuery({
        queryKey:['categories'],
        queryFn: () => JobsService.getAllCategories(),
        staleTime:  1000 * 60 * 5,
    })
};
