import React from 'react'
import { tw } from 'twind'
import Task from './Task'
import { Droppable, Draggable } from 'react-beautiful-dnd'

export default function Column({ column }) {
  return (
    <div className={tw`bg-gray-200 w-80 rounded-lg m-4 p-4`}>
      <h3 className={tw`text-2xl`}>{column.title}</h3>
      {column.tasks.map(task => (
        <Task task={task} key={task.id} />
      ))}
    </div>
  )
}
