import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
// import { getProject } from '../pages/api/project/[id]' //do we need?

const initialState = []

//async
export const fetchProject = createAsyncThunk(
  'project/fetchProject',
  async projectId => {
    const response = await fetch(`/api/project/${projectId}`)
    return await response.json()
  }
)

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    updateColumnOrder: (state, action) => {
      const { source, destination } = action.payload
      // console.log('in reducer', JSON.parse(JSON.stringify(state.columns)))
      const columnToMove = state.columns[source.index]
      const newColumns = Array.from(state.columns)
      newColumns.splice(source.index, 1) //take out column from previous columns
      newColumns.splice(destination.index, 0, columnToMove) //insert column into new columns
      newColumns.map((column, index) => (column.index = index)) //change index property
      // return mutated array
      // console.log('newColumns', newColumns)
      state.columns = newColumns
    }
  },
  extraReducers: {
    [fetchProject.fulfilled]: (state, action) => {
      return action.payload
    }
  }
})

export const {
  updateColumnOrder
  // updateTaskOrderSameCol,
  // updateTaskOrderDiffCol,
} = projectSlice.actions

export default projectSlice.reducer
