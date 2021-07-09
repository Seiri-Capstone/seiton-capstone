import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import EditTaskModal from './EditTaskModal'
import marked from 'marked'
import Modal from './DeleteTaskModal'
import useModal from './CustomModalHook'

export default function Task(props) {
  const { isShowing, toggle } = useModal()
  const { task } = props
  const [show, setShow] = useState(false)
  const taskId = task.id

  return (
    <React.Fragment>
      <Draggable draggableId={`task-${task.id}`} index={props.index}>
        {provided => (
          <div
            className="flex flex-col bg-white rounded-lg my-4 p-1 hover:bg-gray-100"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className="flex flex-row justify-between items-center">
              <h3>{task.title}</h3>
              <div>
                <button
                  onClick={toggle}
                  className="mr-2 border px-2 rounded text-black-800 hover:text-red-500 border-red-500 focus:outline-none"
                >
                  Delete
                </button>
              </div>
              <button
                className="border px-2 rounded text-blue-800 hover:text-blue-500 border-blue-500"
                onClick={() => setShow(true)}
              >
                Edit
              </button>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: marked(task.body)
              }}
            ></div>
          </div>
        )}
      </Draggable>
      <EditTaskModal task={task} show={show} onClose={() => setShow(false)} />
      <Modal isShowing={isShowing} hide={toggle} taskId={taskId} />
    </React.Fragment>
  )
}
