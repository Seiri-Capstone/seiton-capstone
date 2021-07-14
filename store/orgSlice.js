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
    return createdProject
  }
)

export const fetchRemoveUserOrg = createAsyncThunk(
  'org/fetchRemoveUserOrg',
  async body => {
    const { data: removedUser } = await axios.delete(
      `api/org/${body.orgId}/users`,
      body
    )
    return removedUser
  }
)

export const orgSlice = createSlice({
  name: 'org',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSingleOrg.fulfilled]: (state, action) => {
      return action.payload
    },
    [createProject.fulfilled]: (state, action) => {
      return action.payload
    },
    [fetchRemoveUserOrg.fulfilled]: (state, action) => {
      state.users.filter(user => user.userId !== action.payload.userId)
    }
  }
})

export default orgSlice.reducer
