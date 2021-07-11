import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = []

export const fetchOrgs = createAsyncThunk('orgs/fetchOrgs', async () => {
  const { data: orgs } = await axios.get('/api/org')
  return orgs
})

export const orgsSlice = createSlice({
  name: 'orgs',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchOrgs.fulfilled]: (state, action) => {
      return action.payload
    }
  }
})

// export  {  } = orgsSlice.actions

export default orgsSlice.reducer
