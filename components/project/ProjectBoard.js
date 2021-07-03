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
  console.log(project)

  const onDragEnd = result => {
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

    const colOrder = project.columns.map(column => column.id)
    console.log(colOrder)
  }

  return (
    <div>
      {project.columns.map(column => (
        <Column column={column} key={column.id} />
      ))}
    </div>
  )
}
