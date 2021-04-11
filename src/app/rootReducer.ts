import { combineReducers } from '@reduxjs/toolkit'
import projects from '../components/ProjectsPage/ProjectsPageSlice';
import tasksReducer from './tasksReducer';

const rootReducer = combineReducers({
    projects: projects,
    tasks: tasksReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer