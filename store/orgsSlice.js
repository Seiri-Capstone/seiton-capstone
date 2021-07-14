import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = []

export const fetchOrgs = createAsyncThunk('orgs/fetchOrgs', async () => {
  const { data: orgs } = await axios.get('/api/org')
  return orgs
})

export const fetchCreateOrg = createAsyncThunk(
  'orgs/fetchCreateOrg',
  async org => {
    const { data: createdOrg } = await axios.post('/api/org', org)
    return createdOrg
  }
)

export const fetchDeletedOrg = createAsyncThunk(
  'orgs/fetchDeletedOrg',
  async orgId => {
    console.log('in the delete thunk')
    const { data: org } = await axios.delete(`/api/org/${orgId}`)
    return project
  }
)

export const orgsSlice = createSlice({
  name: 'orgs',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchOrgs.fulfilled]: (state, action) => {
      return action.payload
    },
    [fetchCreateOrg.fulfilled]: (state, action) => {
      return [...state, action.payload]
    },
    [fetchDeletedOrg.fulfilled]: (state, action) => {
      return state.filter(org => org.id !== action.payload.id)
    }
  }
})

// export  {  } = orgsSlice.actions

export default orgsSlice.reducer
