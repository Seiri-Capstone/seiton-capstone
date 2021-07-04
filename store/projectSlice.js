import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { getProject } from '../pages/api/project/[id]'

const initialState = []

//async
export const fetchProject = createAsyncThunk(
  'project/fetchProject',
  async projectId => {
    const response = await fetch(
      `http://localhost:3000/api/project/${projectId}`
    )
    // console.log(payload)
    return await response.json()
  }
)

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProject.fulfilled]: (state, action) => {
      return action.payload
    }
  }
})

export default projectSlice.reducer
