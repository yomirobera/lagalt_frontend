const initialState = {
    data: [],
    searchQuery: '',
    filters: {},
    };
    
    const rootReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'SET_SEARCH_QUERY':
    return {
    ...state,
    searchQuery: action.payload,
    };
    case 'APPLY_FILTER':
    return {
    ...state,
    filters: {
    ...state.filters,
    ...action.payload,
    },
    };
    case 'FETCH_DATA_SUCCESS':
    return {
    ...state,
    data: action.payload,
    };
    default:
    return state;
    }
    };
    
