import { createSlice } from '@reduxjs/toolkit';

export const projectSlice = createSlice({
  name: 'projects',
  initialState: {
    data: [],
    error: null,
    searchQuery: '',
    isSearching: true,
    filters: {},
    selectedFilters: [],
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

  /*   selectFilter: (state, action) => {
      state.selectedFilters.push(action.payload);
      const allProjects = state.data;
      state.data = allProjects.filter((project) => { return state.selectedFilters.includes(project.category )});
    }, */

    selectFilter: (state, action) => {
      const updatedSelectedFilters = [...state.selectedFilters, action.payload];
      const allProjects = state.data;
      const updatedProjects = allProjects.filter(project => updatedSelectedFilters.includes(project.category));
    
      return {
        ...state,
        selectedFilters: updatedSelectedFilters,
        data: updatedProjects,
      };
    },
    deselectFilter: (state, action) => {
      const updatedSelectedFilters = state.selectedFilters.filter(value => value !== action.payload);
      const allProjects = state.data;
      const updatedProjects = allProjects.filter(project => updatedSelectedFilters.includes(project.category));
    
      return {
        ...state,
        selectedFilters: updatedSelectedFilters,
        data: updatedProjects,
      };
    }

   /*  deselectFilter: (state, action) => {
      state.selectedFilters = state.selectedFilters.filter(value => value !== action.payload);
      const allProjects = state.data;
      state.data = allProjects.filter((project) => { return state.selectedFilters.includes(project.category )});
    } */
   /*  filterProjects: (state, action) => {
        const allProjects = state.data;
        state.data = allProjects.filter((project) => project.category === action.payload);
    } */
  },
})

// Action creators are generated for each case reducer function
export const { fetchProjects, searchProjects, selectFilter, deselectFilter /* filterProjects */ } = projectSlice.actions

export default projectSlice.reducer;