import { createSlice } from '@reduxjs/toolkit';

export const projectSlice = createSlice({
  name: 'projects',
  initialState: {
    data: [],
    skills: [],
    error: null,
    searchQuery: '',
    isSearching: true,
    selectedFilters: [''],
    filteredData: [],
  },
  reducers: {
    fetchProjects: (state, action) => {
        state.isSearching = false
        state.data = action.payload
        state.filteredData = action.payload
        
    },
    fetchSkills: (state, action) => {
      state.isLoading = false
      state.skills = action.payload     
   },
    searchProjects: (state, action) => {
        const currentProjects  = state.data;
        state.data = currentProjects.filter((project) => project.title.includes(action.payload));
    },

    selectFilter: (state, action) => {
      state.selectedFilters.push(action.payload);
      const allProjects = state.filteredData;
      state.data = allProjects.filter((project) => { return state.selectedFilters.includes(project.category )});
    }, 

   deselectFilter: (state, action) => {
      state.selectedFilters = state.selectedFilters.filter(value => value !== action.payload);
      if (state.selectedFilters.length === 1) {
          state.data = state.filteredData;
      } else {
        const allProjects = state.filteredData;
        state.data = allProjects.filter((project) => { return state.selectedFilters.includes(project.category)});
      }
    }, 
    
    clearFilter: (state, action) => {
      state.selectedFilters = [''];
    }
    
  },

})

// Action creators are generated for each case reducer function
export const { fetchProjects,fetchSkills, searchProjects, selectFilter, deselectFilter,clearFilter } = projectSlice.actions

export default projectSlice.reducer;