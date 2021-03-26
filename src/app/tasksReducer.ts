import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../config/axios';

export interface Tasks {
    [key:string]: {name: string,
        deadline: number,
        done: boolean,
        user: string}
}

export interface TasksState {
    projectId: string,
    tasks: Tasks,
    loading: boolean,
    error: boolean
}

export const initialState:TasksState = {
    projectId: '6050e4550272480015f40561',
    tasks: {},
    loading: false,
    error: false
}

export const fetchTasksByProject = createAsyncThunk(
    'tasks/fetchByProjectId',
    async (projectId:string) => {
        const tasks = axios.get(`/tasks/project/${projectId}`)
        .then( response => response.data)
        .then( data => {
            let tasksList:Tasks= {};
            for (let task in data) {
                const taskId:string = data[task]._id;
                
                tasksList[taskId] = {
                    name: data[task].name,
                    deadline: data[task].deadline,
                    done: data[task].done,
                    user: data[task].user
                }
            }

            return tasksList
        })

        return tasks

    }
)

const tasksReducer = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        // addTask (state, action) {
        //     state.tasks[action.payload.id] = action.payload.data
        // },
        // deleteTask (state,action) {
        //     delete state.tasks[action.payload.id]
        // },
        // addUser (state, action) {
        //     state.tasks[action.payload.id].user = action.payload.user
        // },
        // changeTaskStatus (state, action) {
        //     state.tasks[action.payload.id].done = action.payload.status
        // },
        // changeTaskUser (state, action) {
        //     state.tasks[action.payload.id].user = action.payload.user
        // }
    },
    extraReducers: builder => {
        builder.addCase(fetchTasksByProject.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(fetchTasksByProject.fulfilled, (state,action) => {
            console.log(action.payload)
            state.loading = false
            state.tasks = action.payload
        });
        builder.addCase(fetchTasksByProject.rejected, (state, action) => {
            state.error = true;
            state.loading = false
        })
    }
    }
);

// export const {addTask, deleteTask, addUser, changeTaskStatus, changeTaskUser} = tasksReducer.actions;
export default tasksReducer.reducer