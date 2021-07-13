import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {}

export const fetchUpdateInvite = createAsyncThunk(
  'invitation/fetchUpdateInvite',
  async thunkArg => {
    const { invite, value } = thunkArg
    const { data: invitation } = await axios.put(
      `/api/invitation/${invite.id}`,
      thunkArg
    )
    return invitation
  }
)

export const invitationSlice = createSlice({
  name: 'invitation',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUpdateInvite.fulfilled]: (state, action) => {
      return action.payload
    }
  }
})

export default invitationSlice.reducer
