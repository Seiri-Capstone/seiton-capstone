import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Column from './Column'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import {
  fetchProject,
  fetchReorderColumn,
  fetchReorderTask,
  fetchTaskOrderDiffCol,
  reorderTaskCol,
  createColumn
} from '../../store/projectSlice'
import { signIn, signOut, useSession } from 'next-auth/client'
import NewTask from './NewTask'
import { useRouter } from 'next/router'
import axios from 'axios'
import Pusher from 'pusher-js'

export default function ProjectBoard() {
  const [session, loading] = useSession()
  const project = useSelector(state => state.project)
  const dispatch = useDispatch()
  const router = useRouter()
  const [isColumnReordered, setIsColumnReordered] = useState(false)
  const [isTaskReordered, setIsTaskReordered] = useState(false)
  const [isTaskDiffColReordered, setIsTaskDiffColReordered] = useState(false)

  // const pusher = new Pusher(process.env.NEXT_PUBLIC_KEY, {
  //   cluster: 'us2', // based on my website
  //   authEndpoint: `/api/pusher/auth`, // make sure to change in production
  //   auth: { params: { username: 'helen' } }
  // })

  useEffect(() => {
    dispatch(fetchProject(1)) //hard coded for now
  }, [dispatch, session, router])

  // useEffect(() => {
  //   if (isColumnReordered) {
  //     setIsColumnReordered(false)
  //     axios.post('/api/pusher/reorder', { project })
  //   }

  //   if (isTaskReordered) {
  //     setIsTaskReordered(false)
  //     axios.post('/api/pusher/reorder', { project })
  //   }

  //   if (isTaskDiffColReordered) {
  //     setIsTaskDiffColReordered(false)
  //     axios.post('/api/pusher/reorder', { project })
  //   }
  // }, [isColumnReordered, isTaskReordered, isTaskDiffColReordered])

  // useEffect(() => {
  //   const channel = pusher.subscribe('presence-channel')

  //   channel.bind('reorder', async project => {
  //     console.log(`🟢  pusher:reorder succeeded `, project)
  //     dispatch(reorderTaskCol(project))
  //   })

  //   return () => {
  //     pusher.unsubscribe('presence-channel')
  //   }
  // }, [])

  // const [task, setTask] = useState('')
  // const [title, setTitle] = useState('')
  // const columnId = props.props.column.id
  // const index = props.props.column.tasks.length

  const addColumn = e => {
    const index = project.columns.length
    const title = `Column-${index}`
    const projectId = project.id
    const body = { title, projectId, index }
    dispatch(createColumn(body))
  }

  const onDragEnd = async result => {
    const { destination, source, draggableId, type } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    // COLUMNS

    if (type === 'column') {
      const thunkArg = { result, project }
      await dispatch(fetchReorderColumn(thunkArg))
      setIsColumnReordered(true)
      return
    }

    // 🗓️ TASKS

    // We are grabbing the last character from the draggable ID
    // i.e., "column-5" => 5
    // Note that this will not work for 2 digit strings
    // TODO: Find the index from the right of '-', and feed it
    const sourceNumIdx = source.droppableId.lastIndexOf('-') + 1
    const destNumIdx = destination.droppableId.lastIndexOf('-') + 1
    const sourceNum = Number(source.droppableId.slice(sourceNumIdx))
    const destNum = Number(destination.droppableId.slice(destNumIdx))

    const columns = project.columns
    // start and finish are columns of tasks
    const start = columns.find(col => col.id === sourceNum)
    const finish = columns.find(col => col.id === destNum)
    const finishColId = finish.index

    // SAME COLUMN
    if (start === finish) {
      const tasks = [...start.tasks] // Must copy, otherwise breaks
      const sourceIdx = source.index
      const destIdx = destination.index
      const thunkArg = { tasks, sourceIdx, destIdx, columns, finishColId }
      await dispatch(fetchReorderTask(thunkArg))
      await setIsTaskReordered(true)
      return
    }

    // DIFFERENT COLUMN
    const startTasks = [...start.tasks]
    const finishTasks = [...finish.tasks]
    const sourceIdx = source.index
    const destIdx = destination.index
    const startColId = start.index
    const thunkArg = {
      startTasks,
      finishTasks,
      sourceIdx,
      destIdx,
      startColId,
      finishColId,
      columns
    }

    await dispatch(fetchTaskOrderDiffCol(thunkArg))
    await setIsTaskDiffColReordered(true)
    return
  }

  return (
    <React.Fragment>
      <div className="flex justify-end mr-12">
        <button onClick={addColumn}>+ Add New Column</button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {provided => (
            <div
              className="mx-auto flex flex-col md:flex-row min-w-[300px] justify-center"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {project.columns &&
                project.columns.map((column, index) => (
                  <div key={column.id}>
                    <Column key={column.id} column={column} index={index} />
                  </div>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {/* {toggleTask && <NewTask />} */}
    </React.Fragment>
  )
}
// }
