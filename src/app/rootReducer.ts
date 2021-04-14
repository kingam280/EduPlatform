import { combineReducers } from '@reduxjs/toolkit'
import projects from '../components/ProjectsPage/ProjectsPageSlice';
import tasksReducer from './tasksReducer';
import authorization from "./authorizationReducer"

const rootReducer = combineReducers({
    projects,
    tasks: tasksReducer,
    authorization
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer