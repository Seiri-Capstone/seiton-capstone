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

export const fetchReorderColumn = createAsyncThunk(
  'project/fetchReorderColumn',
  async thunkArg => {
    const { result, project } = thunkArg
    const { source, destination } = result
    const columnToMove = project.columns[source.index]
    const newColumns = Array.from(project.columns)
    newColumns.splice(source.index, 1) //take out column from previous columns
    newColumns.splice(destination.index, 0, columnToMove) //insert column into new columns
    const reorderedCol = await newColumns.map((column, idx) => {
      return { ...column, index: idx }
    })

    // would be great to separate the thunks but was running into problems when dispatching second thunk
    reorderedCol.map(async column => {
      await fetch('/api/column/edit', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(column)
      })
    })
    return reorderedCol
  }
)

export const fetchReorderTask = createAsyncThunk(
  'project/fetchReorderTask',
  async thunkArg => {
    const { tasks, sourceIdx, destIdx } = thunkArg
    const taskToMove = tasks[sourceIdx]
    tasks.splice(sourceIdx, 1)
    tasks.splice(destIdx, 0, taskToMove)
    const reorderedTask = tasks.map((task, idx) => {
      return { ...task, index: idx }
    }) //update index property

    reorderedTask.map(async task => {
      await fetch('/api/task/edit', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      })
    })

    return reorderedTask
  }
)

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    // updateTaskOrderSameCol: (state, action) => {
    //   const { colId, tasks, sourceIdx, destIdx } = action.payload
    //   const taskToMove = tasks[sourceIdx]
    //   tasks.splice(sourceIdx, 1)
    //   tasks.splice(destIdx, 0, taskToMove)
    //   const reorderedTask = tasks.map((task, idx) => {
    //     return { ...task, index: idx }
    //   }) //update index property
    //   console.log(reorderedTask)
    //   state.columns[colId].tasks = reorderedTask
    // },
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
    },
    [fetchReorderColumn.fulfilled]: (state, action) => {
      state.columns = action.payload
    },
    [fetchReorderTask.fulfilled]: (state, action) => {
      console.log('action', action.payload)
      const columns = state.columns
      const colId = action.payload[0].columnId
      console.log(columns, colId)
      columns.forEach(column => {
        if (column.id === colId) {
          column.tasks = action.payload
        }
      })
      console.log('state col', JSON.parse(JSON.stringify(state.columns)))
    }
  }
})

export const {
  updateTaskOrderSameCol,
  updateTaskOrderDiffCol
} = projectSlice.actions

export default projectSlice.reducer
