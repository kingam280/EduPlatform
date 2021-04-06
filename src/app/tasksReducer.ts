import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../config/axios';
import { RootState } from './store';

export interface UpdateUserData {
    taskId: string,
    userId: string
}

export interface TaskData {
    name: string,
    deadline: number,
    description: string,
    done?: boolean,
    userId?: string,
    projectId?: string
}

export interface Task {
    name: string,
    deadline: number,
    done?: boolean,
    user: {
        userId: string,
        name: string
    } | null,
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
    projectId: '606b446ad03d3e094438dcf7',
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
            console.log(data)
            let tasksList:Tasks= {};
            for (let task in data) {
                const taskId:string = data[task]._id;
                
                tasksList[taskId] = {
                    name: data[task].name,
                    deadline: data[task].deadline,
                    done: data[task].done,
                    user: data[task].user ? {userId: data[task].user._id,
                            name: `${data[task].user.firstName} ${data[task].user.lastName}`}
                            : null
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
    async (data:TaskData) => {
        console.log(data)
        const newTask = axios.post('/tasks', data)
        .then(response => {
            return {
                [response.data._id]: {
                    name: response.data.name,
                    deadline: response.data.deadline,
                    done: response.data.done,
                    user: response.data.user ? {userId: data.userId,
                        name: `${response.data.user.firstName} ${response.data.user.lastName}`}
                        : null
                } 
            }
        })
        .catch( error => console.log(error));

        return newTask
        
    }
)

export const removeTaskFromProject = createAsyncThunk(
    'tasks.removeTask',
    async (id:string) => {
        axios.delete(`/tasks/${id}`)
        .then( response => console.log(response))
        .catch(error => console.log(error))

        return id
    }
)

// export const updateUser = createAsyncThunk( 
//     'tasks/updateTask',
//     (data: UpdateUserData, {getState}) => {
//         const store = getState() as RootState;
//         const taskData = store.tasks.tasks[data.taskId];
//         const projectId = store.tasks.projectId;

//         const updatedTask:TaskData = {name: taskData.name,
//                                             deadline: taskData.deadline,
//                                             description: "some description",
//                                             done: taskData.done,
//                                             projectId, 
//                                             userId: data.userId};
//         console.log(updatedTask)

//         axios.put(`/tasks/${data.taskId}`)
//         .then( response => console.log(response))
//         .catch( error => console.log(error))

//         return data
//     }
// )

const tasksReducer = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        // changeTaskStatus (state, action) {
        //     state.tasks[action.payload.id].done = action.payload.status
        // },
        // changeTaskUser (state, action) {
        //     state.tasks[action.payload.id].user = action.payload.user
        // }
    },
    extraReducers: builder => {
        builder.addCase(addTaskToProject.pending, (state, action) => {
            state.loading = true;
            state.error = false
        });
        builder.addCase(addTaskToProject.rejected, (state, action) => {
            state.error = true;
            state.loading = false
        });
        builder.addCase(addTaskToProject.fulfilled, (state,action) => {
            state.loading = false;
            state.tasks = {...state.tasks, ...action.payload}
        });
        builder.addCase(removeTaskFromProject.fulfilled, (state, action) => {
            delete state.tasks[action.payload]
        });
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
        });
        // builder.addCase(updateUser.fulfilled, (state, action) => {
        //     state.tasks[action.payload.taskId].user.userId = action.payload.userId
        // });
    }
})

export default tasksReducer.reducer