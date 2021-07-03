import React from 'react'
import { tw } from 'twind'
import Task from './Task'
import { Droppable, Draggable } from 'react-beautiful-dnd'

export default function Column({ column }) {
  console.log('columns', column)
  return (
    <div>
      <h1>{column.title}</h1>
      {column.tasks.map(task => (
        <Task task={task} key={task.id} />
      ))}
    </div>
  )
}
