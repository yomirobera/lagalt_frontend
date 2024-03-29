import { API_URL } from '../api/projects';
import keycloak from '../components/keycloak/keycloak';
import { fetchProjects } from '../redux/projectsReducer';
import {fetchSkills} from '../redux/projectsReducer';

export const setSearchQuery = (query) => ({
    type: 'SET_SEARCH_QUERY',
    payload: query,
});
    
export const applyFilters = (filters) =>({
      type: 'APPLY_FILTERS',
      payload: filters,
});

export const removeFilter = (filter) =>({
    type: 'REMOVE_FILTER',
    payload: filter,
});

export const clearallFilter = (clear) => ({
    type: 'CLEARALL_FILTER',
    payload: clear,
});

export const fetchProjectList = () => {
    let url = API_URL;
    if(keycloak.authenticated){
        url = `https://superproapiavkennylu.azurewebsites.net/api/v1/users/${keycloak.tokenParsed.sub}/getRecommendedProjects`;
    }
    return (dispatch, getState) => {
        fetch(url) // make a GET request to the API
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

export const fetchUserSkills = () => {
    if(keycloak.authenticated){
        const API_URL_SKILL = `https://superproapiavkennylu.azurewebsites.net/api/v1/users/${keycloak.tokenParsed.sub}/getAllSkills`;
      
    return (dispatch, getState) => {
        fetch(API_URL_SKILL) // make a GET request to the API
            .then(res =>res.json()) 
            .then(
                result => { 
                    if (result){
                        dispatch(fetchSkills(result))
                   } else {
                    console.log('Empty response from API')
                   // dispatch(fetchSkills([]))
                    }     
                }, 
                error => { // handle any errors
                	console.log('Error fetching skills:', error)
                   // dispatch(fetchSkills([]))
                }
            );
       }
    }
}
