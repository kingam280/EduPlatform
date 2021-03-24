import { combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
    // here put reducers
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer