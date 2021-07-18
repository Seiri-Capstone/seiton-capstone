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
    const id = Number(body.orgId)
    const { data: removedUser } = await axios.delete(
      `/api/org/${id}/users/${body.userId}`
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
      state.users = state.users.filter(
        user => user.userId !== action.payload.id
      )
    }
  }
})

export default orgSlice.reducer
