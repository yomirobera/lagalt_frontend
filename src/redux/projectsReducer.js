import { API_URL } from '../api/projects';
const initialState = {
    data: [],
    searchQuery: '',
    isSearching: false,
    filters: {},
};
    
const projectsReducer = async (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SEARCH_QUERY':
            //perform the query search first
            const response = await fetch(API_URL);
            console.log(response.data)
        	fetch(API_URL) // make a GET request to the API
            .then(res => res.json()) 
            .then(
                result => { 
                    state.data = result.filter((value) => value.title.includes(action.payload));
                    console.log(state.data)
                    state.isSearching = true;
                },
                error => { // handle any errors
                	state.data = []
                }
            );
        case 'APPLY_FILTER':
            return {
                ...state,
                filters: {
                ...state.filters,
                ...action.payload,
                },
            };
        case 'FETCH_DATA_SUCCESS':
            fetch(API_URL) // make a GET request to the API
            .then(res => res.json()) 
            .then(
                result => { 
                    state.data = result;
                    console.log(state.data);
                },
                error => { // handle any errors
                	state.data = []
                }
            );
        default:
            return state;
    }
};

export default projectsReducer;
    
