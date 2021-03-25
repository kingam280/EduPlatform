import {createSlice} from '@reduxjs/toolkit';

interface Task {
    name: string,
    deadline: number,
    done: boolean,
    user: string
}

interface TasksState {
    projectId: string,
    tasks: {
        [id: string]: Task
    }
}

const initialState:TasksState = {
    projectId: '',
    tasks: {}
}

const tasksReducer = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask (state, action) {
            state.tasks[action.payload.id] = action.payload.data
        },
        deleteTask (state,action) {
            delete state.tasks[action.payload.id]
        },
        addUser (state, action) {
            state.tasks[action.payload.id].user = action.payload.user
        },
        getTasks (state, action) {
            state.tasks = action.payload
        },
        changeTaskStatus (state, action) {
            state.tasks[action.payload.id].done = action.payload.status
        },
        changeTaskUser (state, action) {
            state.tasks[action.payload.id].user = action.payload.user
        }
    }
});

export const {addTask, deleteTask, addUser, getTasks, changeTaskStatus, changeTaskUser} = tasksReducer.actions;
export default tasksReducer.reducer