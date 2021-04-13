import { combineReducers } from '@reduxjs/toolkit'
import authorization from "./authorizationReducer"

const rootReducer = combineReducers({
    // here put reducers
    authorization
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer