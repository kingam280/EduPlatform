import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../config/axios';

export interface Task {
    name: string,
    deadline: number,
    done?: boolean,
    userId?: string,
    projectId?: string
}

export interface Tasks {
    [key:string]: Task
}

export interface Users {
    [key:string]: {
        firstName: string,
        lastName: string,
        role: string
    }
}

export interface TasksState {
    projectId: string,
    tasks: Tasks,
    users: Users,
    loading: boolean,
    error: boolean
}

export const initialState:TasksState = {
    projectId: '6050e4550272480015f40561',
    tasks: {},
    users: {},
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
                    userId: data[task].user
                } 
            }

            return tasksList
        })

        return tasks

    }
);

export const fetchUsers = createAsyncThunk(
    'tasks/fetchUsers',
    async () => {
        const users = axios.get('/authorization')
        .then( response => response.data)
        .then( data => {
            let usersList:Users= {};
            for (let user in data) {
                const userId:string = data[user]._id;
                
                usersList[userId] = {
                    firstName: data[user].firstName,
                    lastName: data[user].lastName,
                    role: data[user].role,
                }
            }

            return usersList
        })

        return users
    }
)

export const addTaskToProject = createAsyncThunk(
    'tasks/addTask',
    async (data:Task) => {
        const newTask = axios.post('/tasks', data)
        .then(response => {
            return {
                [response.data._id]: {
                    name: response.data.name,
                    deadline: response.data.deadline,
                    done: response.data.done,
                    userId: response.data.user._id
                } as Tasks
            }
        })
        .catch( error => console.log(error));

        return newTask
        
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
            state.loading = false
            state.tasks = action.payload
        });
        builder.addCase(fetchTasksByProject.rejected, (state, action) => {
            state.error = true;
            state.loading = false
        });
        builder.addCase(fetchUsers.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(fetchUsers.fulfilled, (state,action) => {
            state.loading = false
            state.users = action.payload
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.error = true;
            state.loading = false
        })
        builder.addCase(addTaskToProject.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(addTaskToProject.rejected, (state, action) => {
            state.error = true;
            state.loading = false
        });
        builder.addCase(addTaskToProject.fulfilled, (state,action) => {
            state.loading = false;
            state.tasks = {...state.tasks, ...action.payload}
        })
    }
})

export default tasksReducer.reducer