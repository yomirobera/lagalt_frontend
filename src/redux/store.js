import { combineReducers } from "redux";
import projectsReducer from "./projectsReducer";

const rootReducers = combineReducers({
    projectData : projectsReducer
});

export default rootReducers;