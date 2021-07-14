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

export const fetchCreateInvite = createAsyncThunk(
  'invitations/fetchCreateInvite',
  async thunkArg => {
    const { data: newInvites } = await axios.post('/api/invitation', thunkArg)
    return newInvites
  }
)

export const invitationsSlice = createSlice({
  name: 'invitations',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchInvitations.fulfilled]: (state, action) => {
      return action.payload
    },
    [fetchCreateInvite.fulfilled]: (state, action) => {
      return action.payload
    }
  }
})

export default invitationsSlice.reducer
