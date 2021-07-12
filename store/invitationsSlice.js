import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {}

export const fetchInvitations = createAsyncThunk(
  'invitations/fetchSingleinvitation',
  async () => {
    const { data: invitations } = await axios.get('/api/invitation/')
    return invitations
  }
)

export const invitationsSlice = createSlice({
  name: 'invitations',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchInvitations.fulfilled]: (state, action) => {
      return action.payload
    }
  }
})

// export  {  } = orgsSlice.actions

export default invitationsSlice.reducer
