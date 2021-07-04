import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Column from './Column'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { tw } from 'twind'
import {
  fetchProject,
  putProject,
  putColumn,
  updateColumnOrder,
  updateTaskOrderSameCol,
  updateTaskOrderDiffCol
} from '../../store/projectSlice'

export default function ProjectBoard() {
  const project = useSelector(state => state.project)
  const dispatch = useDispatch()
  const [currProject, setCurrProject] = useState(project)

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
      await dispatch(updateColumnOrder(result))
      project.columns.map(column => dispatch(putColumn(column)))
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

    const start = project.columns[sourceNum - 1]
    const finish = project.columns[destNum - 1]

    console.log('source', source)
    console.log('destination', destination)
    console.log('start', start)
    console.log('finish', finish)

    // // If dropped inside the same column
    if (start === finish) {
      const tasks = [...start.tasks]
      const sourceIdx = source.index
      const destIdx = destination.index
      const colId = start.index
      dispatch(
        updateTaskOrderSameCol({
          colId,
          tasks,
          sourceIdx,
          destIdx
        })
      )
      return
    }

    // // If dropped in a different column
    const startTasks = [...start.tasks]
    const finishTasks = [...finish.tasks]
    const sourceIdx = source.index
    const destIdx = destination.index
    const startColId = start.index
    const finishColId = finish.index

    dispatch(
      updateTaskOrderDiffCol({
        startTasks,
        finishTasks,
        sourceIdx,
        destIdx,
        startColId,
        finishColId
      })
    )

    return
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {provided => (
          <div
            className={tw`mx-auto flex justify-center`}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {project.columns &&
              project.columns.map((column, index) => (
                <Column
                  key={column.id}
                  column={column}
                  // tasks={column.tasks}
                  index={index}
                />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
