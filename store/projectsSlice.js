import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = []

//GET ALL PROJECTS
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async () => {
    const { data: projects } = await axios.get('/api/project')
    return projects
  }
)

//DELETE PROJECT
export const fetchDeletedProject = createAsyncThunk(
  'projects/fetchDeletedProject',
  async projectId => {
    console.log('in the delete thunk')
    const { data: project } = await axios.delete(`/api/project/${projectId}`)
    return project
  }
)

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProjects.fulfilled]: (state, action) => {
      return action.payload
    },
    [fetchDeletedProject.fulfilled]: (state, action) => {
      console.log('reducer', action.payload)

      return state.filter(project => project.projectId !== action.payload.id)
    }
  }
})

export default projectsSlice.reducer
