import { API_URL } from '../api/projects';
import { fetchProjects } from '../redux/projectsReducer'

export const setSearchQuery = (query) => ({
    type: 'SET_SEARCH_QUERY',
    payload: query,
});
    
export const applyFilter = (filter) => ({
    type: 'APPLY_FILTER',
    payload: filter,
});

export const fetchProjectList = () => {
    return (dispatch, getState) => {
        fetch(API_URL) // make a GET request to the API
            .then(res => res.json()) 
            .then(
                result => { 
                    dispatch(fetchProjects(result))
                },
                error => { // handle any errors
                	dispatch({type: "FETCH_DATA_ERROR", payload: error})
                }
            );
    }
}