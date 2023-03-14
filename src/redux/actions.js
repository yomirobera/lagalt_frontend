export const setSearchQuery = (query) => ({
    type: 'SET_SEARCH_QUERY',
    payload: query,
    });
    
    export const applyFilter = (filter) => ({
    type: 'APPLY_FILTER',
    payload: filter,
    });