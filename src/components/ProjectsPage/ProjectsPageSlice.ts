import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IProject, IProjectsInitialState } from '../../interfaces/Project'
import axios from '../../config/axios'
  
const initialState: IProjectsInitialState = {
    projects: [],
    groups: [],
    loading: false,
    error: false
}

export const fetchProjects = createAsyncThunk(
    'projects/fetchProjects',
    async () => {
        try {
            const projects = await axios.get('/projects').then(res => res.data)
            const groups = await axios.get('/group').then(res => res.data.result)
            return {projects, groups}
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
            state.projects = action.payload.projects
            state.groups = action.payload.groups
            state.loading = false;
            state.error = false
        });


      }
  })

export default ProjectsPageSlice.reducer