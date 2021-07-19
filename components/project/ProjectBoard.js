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
import { signIn, signOut, useSession } from 'next-auth/client'
import NewTask from './NewTask'
import { useRouter } from 'next/router'
import axios from 'axios'
import Pusher from 'pusher-js'
import Members from './Members'
import Link from 'next/link'
import Logo from '../../components/Logo'

import { colors } from '../../styles/colors'

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

  const updatedDate = String(new Date(project.updatedAt)).substring(3, 15)

  return (
    <React.Fragment>
      <Logo />
      {/* header */}
      <div className="flex justify-between">
        <h2 id="tenor" className="leading-loose">
          {project.name}
        </h2>
        <span className="dark:text-gray-400 self-end text-xs italic mb-2">
          Last updated on {updatedDate}
        </span>
      </div>
      <hr className="border-1 border-skyblue dark:border-gray-500 pb-4"></hr>
      <div className="flex justify-between mb-4">
        <span className="dark:text-gray-400">Members</span>
        <button
          className=" text-red-600 dark:text-red-300 text-sm"
          onClick={deleteProject}
        >
          Delete Project
        </button>
      </div>

      {/* members logic */}
      {/*
      <div className="p-4 border border-gray-400 my-2">
        <Link href={`/projects/${id}/members`}>Project Members -- TEMP</Link>
      </div> */}

      {/* columns */}

      <div className="flex justify-start align-start h-4/5 overflow-x-scroll">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex justify-start">
            <Droppable
              droppableId="all-columns"
              direction="horizontal"
              type="column"
            >
              {provided => (
                <div
                  className="flex md:flex-row"
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
          </div>
        </DragDropContext>
        {/* {toggleTask && <NewTask />} */}
      </div>
    </React.Fragment>
  )
}
// }
