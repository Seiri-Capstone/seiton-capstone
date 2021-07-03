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

  return (
    <div>
      {project.columns &&
        project.columns.map(column => (
          <Column key={column.id} column={column} />
        ))}
    </div>
  )
}
