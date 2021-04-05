import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IFetchedProject, IProject, IProjectsInitialState } from '../../interfaces/Project'
import axios from '../../config/axios'
import userInterface from '../../interfaces/User'
  
const initialState: IProjectsInitialState = {
    projects: [],
    loading: false,
    error: false
}

export const fetchProjects = createAsyncThunk(
    'projects/fetchProjects',
    async () => {
        try {
            const data = await axios.get('/projects').then(res => res.data)
            const users = await axios.get('/authorization').then(res => res.data)

            const mappedData: IProject[] = data.map( (project: IFetchedProject) => {
                const id = project.mentor
                let mappedProject: IProject | undefined
                users.forEach((user: userInterface) => {
                    if (user._id === id) {
                        mappedProject = {
                            ...project,
                            mentor: user
                        }
                    }
                })
                return mappedProject
            })
            return mappedData
        } catch (err) {
            return err.response.data
        }
      
    }
  )

export const addNewProject = createAsyncThunk(
    'projects/addNewProject',
    async (body: IProject) => {
        try {
            const newProject = await axios.post('/projects', body)
            console.log(newProject)
            return newProject
        } catch (err) {
            throw Error(err)
        }
    }
)

export const deleteProject = createAsyncThunk(
    'projects/deleteProject',
    async (id: string) => {
        try {
            const deletedTask = await axios.delete(`/projects/${id}`)
            return deletedTask
        } catch (err) {
            throw Error(err)
        }
    }
)

const ProjectsPageSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(deleteProject.pending, (state, action) => {
            state.loading = true;
            state.error = false
        });
        builder.addCase(deleteProject.rejected, (state, action) => {
            state.loading = false;
            state.error = true
        });
        builder.addCase(deleteProject.fulfilled, (state, action) => {
            state.projects = state.projects.filter(project => !action.payload)
        });
        builder.addCase(fetchProjects.pending, (state, action) => {
            state.loading = true;
            state.error = false
        });
        builder.addCase(fetchProjects.rejected, (state, action) => {
            state.loading = false;
            state.error = true
        });
        builder.addCase(fetchProjects.fulfilled, (state, action) => {
            state.projects = action.payload
            state.loading = false;
            state.error = false
        });


      }
  })

export default ProjectsPageSlice.reducer