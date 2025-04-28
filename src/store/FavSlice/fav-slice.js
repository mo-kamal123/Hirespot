import { createSlice } from "@reduxjs/toolkit";

const dataFromlocalStorage = () => {
    try {
        const jobs = localStorage.getItem('favourites')
        return jobs ? JSON.parse(jobs) : []
    } catch(err) {
        console.log(err);
    }
}

const initialState = {
    jobs: dataFromlocalStorage()
}


const favSlice = createSlice({
    name:'favourites',
    initialState,
    reducers: {
        addJobToFav : (state, action) => {
            const newJob =  action.payload
            const existingJobs = state.jobs.find((job) => job.id === newJob.id)
            if (!existingJobs) {
                state.jobs = [...state.jobs, newJob]
            } else {
                state.jobs = state.jobs.filter((job) => job.id !== newJob.id)
            }
            localStorage.setItem('favourites', JSON.stringify(state.jobs))
        },
        removeFromFav : (state, action) => {
            const id = action.payload
            state.jobs = state.jobs.filter((job) => job.id !== id)
            localStorage.setItem('favourites', JSON.stringify(state.jobs))
        }
    }
})


export const { addJobToFav } = favSlice.actions
export default favSlice.reducer
