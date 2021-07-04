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
  }, [project.id])
  console.log(project.columns)

  //function needed to keep the state updated
  const onDragEnd = result => {
    const { destination, source, draggableId, type } = result
    // //If there is no destination
    if (!destination) {
      return
    }
    // //If source and destination is the same
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    // If you're dragging columns
    // const column = rightColumn(project.columns);
    // const rightColumn = (project.columns) => {

    // }
    // if (type === 'column') {
    //   dispatch(updateColumnOrder(result))
    //   return
    // }
    // // Anything below this happens if you're dragging tasks
    // const start = kanban.columns[source.droppableId]
    // const finish = kanban.columns[destination.droppableId]
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
    //   return
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
    /////////////////////////////////////////////////////
    // //example of result object
    // const result = {
    //   draggableId: 'task-1',  - user was dragging
    //   type: 'TYPE',
    //   reason: 'DROP',
    //   whereDragStarted: {
    //     droppableId: 'column-1',
    //     index: 0
    //   },
    //   whereDragEnded: {
    //     droppableId: 'column-1',
    //     index: 1
    //   }
    // }
    // //end of example
    //////////////////////////////////////////////////
  }

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={tw`mx-auto flex justify-center `}>
          {project.columns &&
            project.columns.map(column => (
              <Column key={column.id} column={column} />
            ))}
        </div>
      </DragDropContext>
    </div>
  )
}
