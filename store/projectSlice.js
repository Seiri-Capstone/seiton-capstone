import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = []

//async
export const fetchProject = createAsyncThunk(
  'project/fetchProject',
  async projectId => {
    const response = await fetch(
      `http://localhost:3000/api/project/${projectId}`
    )
    console.log(response)
    return response.data
  }
)

const projectSlice = createSlice({
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
