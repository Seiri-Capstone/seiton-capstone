import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { tw } from 'twind'

export default function Task(props) {
  const task = props.task
  return (
    <Draggable draggableId={`task-${task.id}`} index={props.index}>
      {provided => (
        <div
          className={tw`flex flex-col bg-white rounded-lg my-4 p-1 hover:bg-gray-100`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className={tw`flex justify-between align-middle`}>
            <h3>{task.title}</h3>
            <button
              className={tw`border px-2 rounded text-blue-800 hover:text-blue-500 border-blue-500`}
              onClick={() => console.log('hello')}
            >
              Hello!
            </button>
          </div>
          <p>{task.body}</p>
        </div>
      )}
    </Draggable>
  )
}
