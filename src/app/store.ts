import { configureStore } from '@reduxjs/toolkit'

import rootReducer from './rootReducer';
import tasksReducer from './tasksReducer';

const store = configureStore({
    reducer: {
        rootReducer,
        tasks: tasksReducer
    },
    devTools: true
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch