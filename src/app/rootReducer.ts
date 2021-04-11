import { combineReducers } from '@reduxjs/toolkit'
import announcements from '../components/Announcements/AnnouncementsSlice'


const rootReducer = combineReducers({
    announcements
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer