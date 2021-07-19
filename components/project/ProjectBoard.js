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
import { fetchDeletedProject } from '../../store/projectsSlice'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import axios from 'axios'
import Pusher from 'pusher-js'
import Navbar from '../nav/Navbar'
import { colors } from '../../styles/colors'
import MembersModal from './MembersModal'

export default function ProjectBoard({ pusher }) {
  const [session, loading] = useSession()
  const project = useSelector(state => state.project)

  const dispatch = useDispatch()
  const router = useRouter()
  const [isColumnReordered, setIsColumnReordered] = useState(false)
  const [isTaskReordered, setIsTaskReordered] = useState(false)
  const [isTaskDiffColReordered, setIsTaskDiffColReordered] = useState(false)
  const [isColNameEdited, setIsColNameEdited] = useState(false)
  const [isColDeleted, setIsColDeleted] = useState(false)
  const [isColAdded, setIsColAdded] = useState(false)
  const [isTaskAdded, setisTaskAdded] = useState(false)
  const [isPinned, setIsPinned] = useState(false)
  const [isTaskEdited, setIsTaskEdited] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { query = {} } = router || {}
  const { id = 0 } = query || {}
  const [colColors, setColColors] = useState(colors)
  const [i, setI] = useState(0)
  const [show, setShow] = useState(false)

  console.log('project in projectboard', project)

  useEffect(() => {
    console.log(`🟢  should run once mounted!`)
    if (mounted) {
      if (isColumnReordered) setIsColumnReordered(false)
      if (isTaskReordered) setIsTaskReordered(false)
      if (isTaskDiffColReordered) setIsTaskDiffColReordered(false)
      if (isColNameEdited) setIsColNameEdited(false)
      if (isColDeleted) setIsColDeleted(false)
      if (isTaskAdded) setisTaskAdded(false)
      if (isPinned) setIsPinned(false)
      if (isTaskEdited) setIsPinned(false)
      axios.post('/api/pusher/reorder', { id, project }) // make this run once component mounts
    }
  }, [
    isColumnReordered,
    isTaskReordered,
    isTaskDiffColReordered,
    isColNameEdited,
    isColDeleted,
    isColAdded,
    isTaskAdded,
    isPinned,
    isTaskEdited
  ])

  useEffect(() => {
    if (id) {
      ;(async () => {
        dispatch(fetchProject(id))
      })()
      const channel = pusher.subscribe(`presence-channel-${id}`)
      channel.bind('reorder', async project => {
        dispatch(reorderTaskCol(project))
      })
      console.log(`🟢  bound to presence-channel-${id}`)
    }
    setMounted(true) // Mount for the first time
    return () => pusher.unsubscribe(`presence-channel-${id}`)
  }, [dispatch, id])

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

  const deleteProject = () => {
    dispatch(fetchDeletedProject(id))
    router.push('/projects')
  }

  // Since [+] is project.columns.length, the newly created col should have an index of len - 1
  // 1 2 3 [+] => 1 2 3 [new] [+]
  const addColumn = async e => {
    const index = project.columns.length
    const title = `Column-${index}`
    const projectId = project.id
    const body = { title, projectId, index }
    await dispatch(createColumn(body))
    await setIsColAdded(true)
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
      <div className="bg-rose-200"></div>
      <div className="bg-red-200"></div>
      <div className="bg-green-200"></div>
      <div className="bg-purple-200"></div>

      <div className="flex overflow-hidden">
        <div className="flex-col ">
          <Navbar />
        </div>
        <div className="flex flex-col h-screen w-5/6">
          <h1 className="flex justify-center flexfont-ibm text-6xl font-bold text-red-800 dark:text-red-200 text-center mt-8">
            {project.name}
          </h1>

          <div className="flex justify-end mt-2 mr-12">
            <button
              className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
              onClick={deleteProject}
            >
              Delete Project
            </button>
          </div>

          <div className="flex justify-end mt-2 mr-12">
            <button onClick={() => setShow(true)}>Project Members</button>
          </div>
          <MembersModal show={show} onClose={() => setShow(false)} />

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
              droppableId="all-columns"
              direction="horizontal"
              type="column"
            >
              {provided => (
                <div
                  className="flex w-full h-3/4 md:flex-row"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {project.columns &&
                    project.columns.map((column, index) => (
                      <div key={column.id}>
                        {/* onClick={() => setI(i + 1)}> */}
                        <Column
                          setCol={setIsColNameEdited}
                          delCol={setIsColDeleted}
                          addTask={setisTaskAdded}
                          key={column.id}
                          column={column}
                          index={index}
                          colColor={colColors[i]}
                          setPin={setIsPinned}
                          taskEdit={setIsTaskEdited}
                        />
                      </div>
                    ))}
                  <div>
                    <button
                      className="border-dashed border-2 border-black-500 w-80 h-18 rounded-lg m-4 p-4 justify-end"
                      onClick={addColumn}
                    >
                      + Add New Column
                    </button>
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          {/* {toggleTask && <NewTask />} */}
        </div>
      </div>
      <span id="membersModal"></span>
    </React.Fragment>
  )
}
// }
