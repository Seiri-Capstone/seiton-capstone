import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { tw } from 'twind'
import Modal from './Modal'

export default function Task(props) {
  const [show, setShow] = useState(false)
  const task = props.task
  return (
    <React.Fragment>
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
                onClick={() => setShow(true)}
              >
                Edit
              </button>
            </div>
            <p>{task.body}</p>
          </div>
        )}
      </Draggable>
      <Modal task={task} show={show} onClose={() => setShow(false)} />
    </React.Fragment>
  )
}
