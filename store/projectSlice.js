import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

const initialState = []

//async
export const fetchProject = createAsyncThunk(
  'project/fetchProject',
  async projectId => {
    const response = await fetch(`/api/project/${projectId}`)
    return await response.json()
  }
)

export const putProject = createAsyncThunk(
  'project/putProject',
  async updatedProject => {
    const response = await fetch('/api/project/edit', updatedProject)
    return await response.json()
  }
)

export const reorderColumn = createAsyncThunk()
//reordering column logic here
// putColumn(updatedColumn)

export const putColumn = createAsyncThunk(
  'project/putColumn',
  async updatedColumn => {
    const response = await fetch('/api/column/edit', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedColumn)
    })
    return await response.json()
  }
)

export const putTask = createAsyncThunk(
  'project/putTask',
  async updatedTask => {
    const response = await fetch('/api/task/edit', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })
    return await response.json()
  }
)

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    updateColumnOrder: (state, action) => {
      const { source, destination } = action.payload
      const columnToMove = state.columns[source.index]
      const newColumns = Array.from(state.columns)
      newColumns.splice(source.index, 1) //take out column from previous columns
      newColumns.splice(destination.index, 0, columnToMove) //insert column into new columns
      newColumns.map((column, idx) => (column.index = idx)) //change index property, may not be needed
      // return mutated array
      state.columns = newColumns

      console.log('in reducer', JSON.parse(JSON.stringify(state)))
    },
    updateTaskOrderSameCol: (state, action) => {
      const { colId, tasks, sourceIdx, destIdx } = action.payload
      const taskToMove = tasks[sourceIdx]
      tasks.splice(sourceIdx, 1)
      tasks.splice(destIdx, 0, taskToMove)
      const reorderedTask = tasks.map((task, idx) => {
        return { ...task, index: idx }
      }) //update index property
      state.columns[colId].tasks = reorderedTask
    },
    updateTaskOrderDiffCol: (state, action) => {
      const {
        startTasks,
        finishTasks,
        sourceIdx,
        destIdx,
        startColId,
        finishColId
      } = action.payload
      const taskToMove = startTasks[sourceIdx]
      startTasks.splice(sourceIdx, 1)
      finishTasks.splice(destIdx, 0, taskToMove)

      state.columns[startColId].tasks = startTasks
      state.columns[finishColId].tasks = finishTasks
    }
  },
  extraReducers: {
    [fetchProject.fulfilled]: (state, action) => {
      return action.payload
    }
  }
})

export const {
  updateColumnOrder,
  updateTaskOrderSameCol,
  updateTaskOrderDiffCol
} = projectSlice.actions

export default projectSlice.reducer
