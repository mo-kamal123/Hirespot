import { createSlice } from "@reduxjs/toolkit";


const initialState = { jobs: []}

const jobsSlice = createSlice({
    name:'jobs',
    initialState,
    reducers: {
        replaceJobs : (state, action) => {
            state.jobs = action.payload
        },
    }
})

export const { replaceJobs } = jobsSlice.actions
export default jobsSlice.reducer  