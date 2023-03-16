import { createSlice } from '@reduxjs/toolkit';

export const projectSlice = createSlice({
  name: 'projects',
  initialState: {
    data: [],
    error: null,
    searchQuery: '',
    isSearching: true,
    filters: {},
  },
  reducers: {
    fetchProjects: (state, action) => {
        state.isSearching = false
        state.data = action.payload
    },
    searchProjects: (state, action) => {
        const currentProjects  = state.data;
        state.data = currentProjects.filter((project) => project.title.includes(action.payload));
    },
    filterProjects: (state, action) => {
        const allProjects = state.data;
        state.data = allProjects.filter((project) => project.category === action.payload);
    }
  },
})

// Action creators are generated for each case reducer function
export const { fetchProjects, searchProjects, filterProjects } = projectSlice.actions

export default projectSlice.reducer;