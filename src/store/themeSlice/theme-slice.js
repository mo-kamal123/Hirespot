import { createSlice } from "@reduxjs/toolkit";

const themeFromLocalStorage = () => {
    try {
        const theme = localStorage.getItem('theme')
        return theme ? JSON.parse(theme) : false
    } catch(err) {
        console.log(err);
    }
}

const themeSlice = createSlice({
    name:'dark-mode',
    initialState:{theme: themeFromLocalStorage()},
    reducers:{
        toggleDarkMode: (state) => {
            state.theme = !state.theme 
            const root = document.documentElement
            if(state.theme) {
                root.classList.add('dark')
            } else {
                root.classList.remove('dark')
            }
            localStorage.setItem('theme', state.theme)
        }
    }
})

export const {toggleDarkMode} = themeSlice.actions
export default themeSlice.reducer