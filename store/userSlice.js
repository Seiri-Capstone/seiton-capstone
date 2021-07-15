import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import axios from 'axios'
const initialState = {}

//thunk
export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const { data: user } = await axios.get('/api/user')
  return user
})
export const fetchEditUser = createAsyncThunk(
  'user/fetchEditUser',
  async user => {
    const { data: updatedUser } = await axios.put('/api/user', user)
    return updatedUser
  }
)
//reducer
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchEditUser.fulfilled]: (state, action) => {
      state = action.payload
      return state
    },
    [fetchUser.fulfilled]: (state, action) => {
      state = action.payload
      return state
    }
  }
})

export default userSlice.reducer
