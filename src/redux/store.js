import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./projectsReducer";

export default configureStore({
    reducer: {
        projects: projectReducer
    }
});