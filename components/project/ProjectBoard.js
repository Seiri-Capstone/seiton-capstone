import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Column from './Column'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import {
  fetchProject,
  fetchReorderColumn,
  fetchReorderTask,
  fetchTaskOrderDiffCol,
  reorderCol,
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
  const [isReorderedCol, setIsReorderedCol] = useState(false)
  // const [thunkArg, setThunkArg] = useState(null)
  const dispatch = useDispatch()
  const router = useRouter()
  const pusher = new Pusher(process.env.NEXT_PUBLIC_KEY, {
    cluster: 'us2', // based on my website
    authEndpoint: `/api/pusher/auth`, // make sure to change in production
    auth: { params: { username: 'helen' } }
  })

  useEffect(() => {
    dispatch(fetchProject(1)) //hard coded for now
  }, [dispatch, session, router])

  useEffect(() => {
    console.log(`🟢  useEffect for Chat.js running!`)

    const channel = pusher.subscribe('presence-channel')

    channel.bind('reorder-col', async project => {
      console.log(`🟢  pusher:reorder-col succeeded `, project)
      dispatch(reorderCol(project))
    })

    return () => {
      pusher.unsubscribe('presence-channel')
    }
  }, [])
  // const [task, setTask] = useState('')
  // const [title, setTitle] = useState('')
  // const columnId = props.props.column.id
  // const index = props.props.column.tasks.length
  console.log('project', project)
  const addColumn = e => {
    const index = project.columns.length
    const title = `Column-${index}`
    const projectId = project.id
    const body = { title, projectId, index }
    dispatch(createColumn(body))
  }

  const onDragEnd = async result => {
    const { destination, source, draggableId, type } = result
    //If there is no destination
    if (!destination) {
      return
    }

    //If source and destination is the same
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    // If you're dragging columns
    if (type === 'column') {
      const thunkArg = { result, project }

      await dispatch(fetchReorderColumn(thunkArg))
      setIsReorderedCol(true)
      // await axios.post('/api/pusher/reorder', { project })
      return
    }

    // Anything below this happens if you're dragging tasks
    const sourceNum = Number(source.droppableId[source.droppableId.length - 1])
    const destNum = Number(
      destination.droppableId[destination.droppableId.length - 1]
    )

    // this is really brute-forced and probably can be done in a better way
    // sourceNum & destNum is retrieving the column.id from droppableId
    // droppableId needs to be column-${column.id} or task-${task.id} in order to differentiate between column and task, if theyre both just numbers (that are the same), logic gets messed up
    // for start and finish, need to -1 from source/dest num so it matches up to the array index

    const start = project.columns.filter(col => col.id === sourceNum)[0]
    const finish = project.columns.filter(col => col.id === destNum)[0]
    const finishColId = finish.index
    const columns = project.columns

    // // If dropped inside the same column
    if (start === finish) {
      const tasks = [...start.tasks]
      const sourceIdx = source.index
      const destIdx = destination.index
      const thunkArg = { tasks, sourceIdx, destIdx, columns, finishColId }
      dispatch(fetchReorderTask(thunkArg))
      return
    }

    // // If dropped in a different column
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

    dispatch(fetchTaskOrderDiffCol(thunkArg))
    return
  }

  // if (!session) {
  //   return "You're not logged in!"
  // } else {
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
      <button
        type="submit"
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        onClick={() => signOut()}
      >
        SIGN OUT
      </button>
    </React.Fragment>
  )
}
// }
