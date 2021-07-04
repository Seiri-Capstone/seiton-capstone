import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Column from './Column'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { tw } from 'twind'
import { fetchProject } from '../../store/projectSlice'

export default function ProjectBoard() {
  const project = useSelector(state => state.project)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProject(1))
  }, [])
  console.log('project', project)

  const onDragEnd = result => {
    const { destination, source, draggableId, type } = result
    console.log('result', result)
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
      dispatch(updateColumnOrder(result))
      return
    }

    // // Anything below this happens if you're dragging tasks
    // const start = project.columns[source.droppableId]
    // const finish = project.columns[destination.droppableId]

    // // If dropped inside the same column
    // if (start === finish) {
    //   const tasks = [...start.taskIds]
    //   const sourceIdx = source.index
    //   const destIdx = destination.index
    //   const colId = start.id
    //   dispatch(
    //     updateTaskOrderSameCol({
    //       colId,
    //       tasks,
    //       sourceIdx,
    //       destIdx,
    //       draggableId
    //     })
    //   )
    // return
    // }

    // // If dropped in a different column
    // const startTasks = [...start.taskIds]
    // const finishTasks = [...finish.taskIds]
    // const sourceIdx = source.index
    // const destIdx = destination.index
    // const startColId = start.id
    // const finishColId = finish.id

    // dispatch(
    //   updateTaskOrderDiffCol({
    //     startTasks,
    //     finishTasks,
    //     sourceIdx,
    //     destIdx,
    //     draggableId,
    //     startColId,
    //     finishColId
    //   })
    // )
    // return
  }

  return (
    <div className={tw`mx-auto flex justify-center`}>
      {project.columns &&
        project.columns.map(column => (
          <Column key={column.id} column={column} />
        ))}
    </div>
  )
}
