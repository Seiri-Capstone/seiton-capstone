import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Column from './Column'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { tw } from 'twind'
import {
  fetchProject,
  fetchReorderColumn,
  fetchReorderTask,
  fetchTaskOrderDiffCol
} from '../../store/projectSlice'
import NewTask from './NewTask'
import AuthForm from '../auth/AuthForm'
import { useSession } from 'next-auth/client'

export default function ProjectBoard() {
  const [session, loading] = useSession()
  console.log('session in project', session)
  //   // toggle new task
  //   const [toggleTask, setToggleTask] = useState(false)
  //   const toggleNewTask = () => setToggleTask(!toggleTask)
  //  // end toggle new task

  const project = useSelector(state => state.project)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProject(1)) //hard coded for now
  }, [dispatch])

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
  if (!session) {
    return "You're not logged in!"
  } else {
    return (
      <>
        <DragDropContext onDragEnd={onDragEnd}>
          {/* <button className={tw`border border-red-500 mx-auto`}>
          Add New Column
        </button> */}
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="column"
          >
            {provided => (
              <div
                className={tw`mx-auto flex flex-col md:flex-row min-w-[300px] justify-center`}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {project.columns &&
                  project.columns.map((column, index) => (
                    <>
                      <Column
                        key={column.id}
                        column={column}
                        // toggleTask={toggleTask}
                        // onChange={toggleNewTask}
                        index={index}
                      />
                    </>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {/* {toggleTask && <NewTask />} */}
      </>
    )
  }
}
