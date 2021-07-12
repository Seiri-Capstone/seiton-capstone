import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {}

export const fetchSingleOrg = createAsyncThunk(
  'org/fetchSingleOrg',
  async orgId => {
    const { data: org } = await axios.get(`/api/org/${orgId}`)
    return org
  }
)

export const createProject = createAsyncThunk(
  'org/createProject',
  async body => {
    const { data: createdProject } = await axios.post('/api/project', body)
    console.log('createdProject in thunk', createdProject)
    return createdProject
  }
)

export const orgsSlice = createSlice({
  name: 'org',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSingleOrg.fulfilled]: (state, action) => {
      return action.payload
    },
    [createProject.fulfilled]: (state, action) => {
      return action.payload
    }
  }
})

// export  {  } = orgsSlice.actions

export default orgsSlice.reducer
