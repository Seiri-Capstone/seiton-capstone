import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = []

export const fetchProject = createAsyncThunk(
  'project/fetchProject',
  async projectId => {
    // try catch here
    const response = await axios.get(`/api/project/${projectId}`)
    // ultimately we want it to represent an array form
    return await response.data
    // Get back sorted array
  }
)
// PUT tasks // TODO(sey)
export const assignTask = createAsyncThunk(
  'project/assignTask',
  async ({ colId, taskId, users }) => {
    const userIds = users.map(u => u.id)
    // should be a map
    const { data: task } = await axios.put(`/api/task/${taskId}`, {
      taskId,
      userIds
    }) // the id is taken from
    // what is data being returned here?
    return { task, users }
    // updated task, with its ID. need the colId passed inhow do we find out
  }
)
// PUT tasks // TODO(sey)
export const pinTask = createAsyncThunk('project/pinTask', async task => {
  const { id, pinned } = task
  console.log(`🟢  working???`, id, pinned)
  const { data } = await axios.put(`/api/task/${id}`, {
    action: 'pinTask',
    pinned: !pinned, // Toggle
    id
  })
  console.log(`🟢  data returned from axios `, data)
  return data
})
// POST tasks
export const createTask = createAsyncThunk('project/createTask', async body => {
  const { data: createdTask } = await axios.post('/api/task', body)
  return createdTask
})
// POST columns
export const createColumn = createAsyncThunk(
  'project/createColumn',
  async body => {
    const { data: createdColumn } = await axios.post('/api/column', body)
    return createdColumn
  }
)
// PIN columns // TODO(sey)
export const pinColumn = createAsyncThunk('project/pinColumn', async colId => {
  await axios.put(`/api/column/${colId}`, { pinned: true })
})
// DELETE task
export const deleteTask = createAsyncThunk('project/deleteTask', async id => {
  const { data: deletedTask } = await axios.delete(`/api/task/${id}`)
  return deletedTask
})
// DELETE column
export const deleteColumn = createAsyncThunk(
  'project/deleteColumn',
  async id => {
    const { data: deletedColumn } = await axios.delete(`/api/column/${id}`)
    return deletedColumn
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

    Promise.all(reorderedCol.map(column => axios.put('/api/column', column)))
    return reorderedCol
  }
)

export const fetchReorderTask = createAsyncThunk(
  'project/fetchReorderTask',
  async thunkArg => {
    const { tasks, sourceIdx, destIdx, columns, finishColId } = thunkArg
    const taskToMove = tasks[sourceIdx]
    tasks.splice(sourceIdx, 1)
    tasks.splice(destIdx, 0, taskToMove)
    const destColId = columns[finishColId].id

    const reorderedTask = tasks.map((task, idx) => {
      return { ...task, index: idx, columnId: destColId }
    }) //update index property

    /**
     * Promise all seems to be awaited?
     * no flicker or re-rendering issues
     */
    Promise.all(reorderedTask.map(task => axios.put('/api/task', task)))
    return reorderedTask
  }
)

export const fetchTaskOrderDiffCol = createAsyncThunk(
  'project/fetchTaskOrderDiffCol',
  async thunkArg => {
    const {
      startTasks,
      finishTasks,
      sourceIdx,
      destIdx,
      startColId,
      finishColId,
      columns
    } = thunkArg
    const taskToMove = startTasks[sourceIdx]
    startTasks.splice(sourceIdx, 1)
    finishTasks.splice(destIdx, 0, taskToMove)
    const destColId = columns[finishColId].id

    const updatedFinishTasks = finishTasks.map((task, idx) => {
      return { ...task, columnId: destColId, index: idx }
    })

    Promise.all(updatedFinishTasks.map(task => axios.put('/api/task', task)))

    return { startTasks, finishTasks, startColId, finishColId }
  }
)
//PUT EDIT task body
export const fetchEditTask = createAsyncThunk(
  'project/fetchEditTask',
  async task => {
    const res = await axios.put('/api/task', task)
    return res
  }
)
//PUT EDIT column name
export const updateColumnName = createAsyncThunk(
  'project/updateColumnName',
  async column => {
    const { data: updatedColumn } = await axios.put('/api/column', column)
    return updatedColumn
  }
)

//DELETE remove user from project
export const fetchRemoveUserProject = createAsyncThunk(
  'project/fetchRemoveUserProject',
  async body => {
    // const id = Number(body.projectId)
    const { data: removedUser } = await axios.delete(
      `/api/project/${body.projectId}/users/${body.userId}`
    )
    return removedUser
  }
)

//PUT update isAdmin user in project
export const fetchAdminUserUpdate = createAsyncThunk(
  'project/fetchAdminUserUpdate',
  async thunkArg => {
    const { data: updatedUser } = await axios.put(
      `/api/project/${thunkArg.projectId}/users/${thunkArg.userId}`,
      thunkArg
    )
    return updatedUser
  }
)

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    reorderTaskCol(state, action) {
      return action.payload.project
    }
  },
  extraReducers: {
    [createTask.fulfilled]: (state, action) => {
      const { columnId } = action.payload
      const updatedColId = state.columns.filter(col => col.id === columnId)[0]
        .index
      state.columns[updatedColId].tasks.push(action.payload)
    },
    // TODO(sey)
    [assignTask.fulfilled]: (state, action) => {
      const { task, users } = action.payload
      // created task add to users... which action did we add
      console.log(`🟢  task, users `, task, users)
      // task.id : 3, task.columnId: 2
      // find col by finding which index is the column
      const COL = state.columns.find(c => c.id === task.columnId)
      // const COL = state.columns[task.columnId - 1]
      // Doesn't work for the last column
      const COLTASKS = COL.tasks
      const TASK = COLTASKS.find(e => e.id === task.id)
      TASK.user = users
    },
    // TODO(sey)
    [pinTask.fulfilled]: (state, action) => {
      const { columnId, id, pinned } = action.payload
      const COL = state.columns.find(c => c.id === columnId)
      const TASK = COL.tasks.find(c => c.id === id)
      TASK.pinned = pinned
    },
    [createColumn.fulfilled]: (state, action) => {
      action.payload['tasks'] = []
      state.columns.push(action.payload)
    },
    [deleteTask.fulfilled]: (state, action) => {
      // grab columnId from a task that's beind deleted
      const { columnId } = action.payload
      //grab column I'm updating
      const column = state.columns.filter(column => column.id === columnId)[0]
      //Update tasks inside a certain column
      state.columns[column.index].tasks = state.columns[
        column.index
      ].tasks.filter(task => task.id !== action.payload.id)
    },
    [deleteColumn.fulfilled]: (state, action) => {
      state.columns = state.columns.filter(
        column => column.id !== action.payload.id
      )
    },
    [fetchProject.pending]: (state, action) => {
      // https://redux-toolkit.js.org/api/createAsyncThunk
      return action.payload
    },
    [fetchProject.fulfilled]: (state, action) => {
      return action.payload
    },
    [fetchReorderColumn.fulfilled]: (state, action) => {
      state.columns = action.payload
    },
    [fetchReorderTask.fulfilled]: (state, action) => {
      const columns = state.columns
      const colId = action.payload[0].columnId

      columns.forEach(column => {
        if (column.id === colId) {
          column.tasks = action.payload
        }
      })
    },
    [fetchTaskOrderDiffCol.fulfilled]: (state, action) => {
      const { startTasks, finishTasks, startColId, finishColId } =
        action.payload
      const columns = state.columns
      columns.forEach((column, idx) => {
        if (idx === startColId) column.tasks = startTasks
        if (idx === finishColId) column.tasks = finishTasks
      })
    },
    [fetchEditTask.fulfilled]: (state, action) => {
      const colId = action.payload.data.columnId
      const taskId = action.payload.data.id
      const columns = state.columns
      //this can probably be refactored
      for (let i = 0; i < columns.length; i++) {
        for (let j = 0; j < columns[i].tasks.length; j++) {
          const tasks = columns[i].tasks
          if (tasks[j].id === taskId) {
            tasks[j] = action.payload.data
          }
        }
      }
    },
    [updateColumnName.fulfilled]: (state, action) => {
      state.columns.forEach((column, i) => {
        if (column.id === action.payload.id) {
          action.payload['tasks'] = column.tasks
          state.columns[i] = action.payload
        }
      })
    },
    [fetchRemoveUserProject.fulfilled]: (state, action) => {
      state.users = state.users.filter(user => {
        console.log('in reducer', action.payload)
        return user.userId !== action.payload.id
      })
    },
    [fetchAdminUserUpdate.fulfilled]: (state, action) => {
      state.users = state.users.map(user => {
        return user.userId === action.payload[0].userId
          ? action.payload[0]
          : user
      })
    }
  }
})

export const {
  updateTaskOrderSameCol,
  updateTaskOrderDiffCol,
  reorderTaskCol
} = projectSlice.actions

export default projectSlice.reducer
