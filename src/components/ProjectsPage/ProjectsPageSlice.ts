import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { basicProjectInterface, projectInterface } from '../../interfaces/Project'
import axios from '../../config/axios'
import userInterface from '../../interfaces/User'

interface ProjectsState {
    projects: projectInterface[],
    loading: Boolean
  }
  
const initialState: ProjectsState = {
    projects: [],
    loading: false
}

export const fetchProjects = createAsyncThunk(
    'projects/fetchProjects',
    async () => {
        try {
            const data = await axios.get('/projects').then(res => res.data)
            const users = await axios.get('/authorization').then(res => res.data)

            const mappedData: projectInterface[] = data.map( (project: basicProjectInterface) => {
                const id = project.mentor
                let mappedProject: projectInterface | undefined
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

const ProjectsPageSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {},
    extraReducers: {
        [`${fetchProjects.pending}`]: (state) => {
            state.loading = true
          },
        [`${fetchProjects.fulfilled}`]: (state, action) => {
          state.projects = action.payload
          state.loading = false
        },

      }
  })

export default ProjectsPageSlice.reducer