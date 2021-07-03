import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Column from './Column'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { tw } from 'twind'
import { fetchProject } from '../../store/projectSlice'

export default function ProjectBoard() {
  const project = useSelector(state => state.project)
  const dispatch = useDispatch()
  dispatch(fetchProject(1))

  console.log(project)

  return <div>hi</div>
}
