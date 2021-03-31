import { combineReducers } from '@reduxjs/toolkit'
import projects from '../components/ProjectsPage/ProjectsPageSlice'

const rootReducer = combineReducers({
    projects
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer