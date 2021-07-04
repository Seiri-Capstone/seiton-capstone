import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { tw } from 'twind'

export default function Task({ task, index }) {
  return (
    <Draggable draggableId={String(task.id)} index={index}>
      {provided => {
        return (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={tw`border border-gray-300 p-2 mb-2 rounded bg-white`}
          >
            <h6>{task.title}</h6>
            <p>{task.body}</p>
          </div>
        )
      }}
    </Draggable>
  )
}
