import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
// import { getProject } from '../pages/api/project/[id]' //do we need?

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
  reducers: {
    updateColumnOrder: (state, action) => {
      // const { source, destination, draggableId } = action.payload
      // console.log('source', source)
      // console.log('destination', destination)
      // console.log('draggableId', draggableId)
      // console.log('state', state)
      const startIdx = source.index
      const finishIdx = destination.index

      // newColumnOrder.splice(source.index, 1)
      // newColumnOrder.splice(destination.index, 0, draggableId)
      // console.log('In updateColumnOrder Reducer: ', newColumnOrder)
      // // return mutated array
      // state.columnOrder = newColumnOrder
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
