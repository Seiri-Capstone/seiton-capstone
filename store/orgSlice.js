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

export const orgsSlice = createSlice({
  name: 'org',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSingleOrg.fulfilled]: (state, action) => {
      return action.payload
    }
  }
})

// export  {  } = orgsSlice.actions

export default orgsSlice.reducer
