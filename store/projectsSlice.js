import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = []

//GET ALL PROJECTS
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async () => {
    const { data: projects } = await axios.get('/api/projects')
    return projects
  }
)

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProjects.fulfilled]: (state, action) => {
      return action.payload
    }
  }
})

export default projectsSlice.reducer
