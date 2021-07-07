import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { tw } from 'twind'

export default function Task(props) {
  const task = props.task
  return (
    <Draggable draggableId={`task-${task.id}`} index={props.index}>
      {provided => (
        <div
          className={tw`bg-white rounded-lg my-4 p-1`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className={tw`flex flex-row justify-between items-center`}>
            <h3>{task.title}</h3>
            <button className={tw`mr-2`}>x</button>
          </div>
          <p>{task.body}</p>
        </div>
      )}
    </Draggable>
  )
}
