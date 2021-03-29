import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../config/axios';
import { RootState } from './store';

export interface UpdateUserData {
    taskId: string,
    userId: string
}

export interface Task {
    name: string,
    deadline: number,
    done?: boolean,
    userId: string,
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
    projectId: '6050e4770272480015f40565',
    tasks: {},
    users: {},
    loading: false,
    error: false
}

export const fetchTasksWithUsersForProject = createAsyncThunk(
    'tasks/fetchTasksWithUsersForProject',
    (projectId: string) => {

        const data = Promise.all([axios.get(`/tasks/project/${projectId}`),
                    axios.get('/authorization')])
            .then(response => {
                const tasksResponse = response[0].data;
                const usersResponse = response[1].data;

                let tasks:Tasks= {};
                for (let task in tasksResponse) {
                    const taskId:string = tasksResponse[task]._id;
                    
                    tasks = {...tasks, [taskId]: {
                        name: tasksResponse[task].name,
                        deadline: tasksResponse[task].deadline,
                        done: tasksResponse[task].done,
                        userId: tasksResponse[task].user
                    } as Task}
                }

                let users:Users= {};
                for (let user in usersResponse) {
                    const userId:string = usersResponse[user]._id;
                    
                    users = {...users, [userId]: {
                        firstName: usersResponse[user].firstName,
                        lastName: usersResponse[user].lastName,
                        role: usersResponse[user].role,
                    }}
                }

                return {tasks, users}
            })
            .catch(error => error)

        return data
    }
)

export const addTaskToProject = createAsyncThunk(
    'tasks/addTask',
    async (data:Task) => {
        console.log(data)
        const newTask = axios.post('/tasks', data)
        .then(response => {
            return {
                [response.data._id]: {
                    name: response.data.name,
                    deadline: response.data.deadline,
                    done: response.data.done,
                    userId: response.data.user ? response.data.user._id : null
                } as Tasks
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

export const updateUser = createAsyncThunk( 
    'tasks/updateTask',
    (data: UpdateUserData, {getState}) => {
        const store = getState() as RootState;
        const taskData = store.tasks.tasks[data.taskId];
        const projectId = store.tasks.projectId;

        const updatedTask = {...taskData, _id: data.taskId, projectId, userId:data.userId, description: "nothing to add"};
        console.log(updatedTask)

        axios.delete(`/tasks/${data.taskId}`)
        .then ( () => axios.post('/tasks', updatedTask))
        .then( response => console.log(response))
        .catch( error => console.log(error))

        return data
    }
)

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
        builder.addCase(fetchTasksWithUsersForProject.pending, (state, action) => {
            state.loading = true;
            state.error = false
        });
        builder.addCase(fetchTasksWithUsersForProject.rejected, (state, action) => {
            state.loading = false;
            state.error = true
        });
        builder.addCase(fetchTasksWithUsersForProject.fulfilled, (state, action) => {
            console.log(action.payload)
            state.loading = false;
            state.tasks = action.payload.tasks;
            state.users = action.payload.users;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.tasks[action.payload.taskId].userId = action.payload.userId
        });
    }
})

export default tasksReducer.reducer