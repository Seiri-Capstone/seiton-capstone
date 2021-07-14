import React, { useState, useEffect } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import EditTaskModal from './EditTaskModal'
import DeleteTaskModal from './DeleteTaskModal'
import marked from 'marked'
import Modal from './DeleteTaskModal'
import TaskDropdownMenu from './TaskDropdownMenu'
import Comments from './Comments'
import { useSession } from 'next-auth/client'
import { useDispatch } from 'react-redux'

export default function Task({ task, index }) {
  // const { isShowing, toggle } = useModal()
  const [show, setShow] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const taskId = task.id
  const [session] = useSession()
  const dispatch = useDispatch()

  // EditTaskModal
  const [isClosed, setClosed] = useState(false)
  const [showEditTask, setShowEditTask] = useState(false)

  const toggleEdit = () => setClosed(!isClosed)

  const onKey = e => {
    if (e.key === 'Escape') {
      setShowEditTask(false)
    }
  }

  // Delete
  const [isShowing, setIsShowing] = useState(false)

  // DeleteTaskModal
  function toggle() {
    // Delete Modal
    setClosed(!isClosed)
    setIsShowing(!isShowing)
  }

  return (
    <React.Fragment>
      <Draggable draggableId={`task-${task.id}`} index={index}>
        {provided => (
          <div
            className="flex flex-col bg-white rounded-lg my-4 p-1 hover:bg-gray-100"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className="flex flex-row justify-between items-center">
              <h3 className="pl-1">{task.title}</h3>
              {/* Delete Task | 🔴 Trash can */}
              <button
                onClick={() => {
                  toggle()
                }}
                className="text-blue-500  font-bold uppercase text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                className="text-xs text-gray-400 dark:text-gray-200"
                onClick={() => dispatch(assignTask(task.id))}
              >
                Assign {`task-${task.id}`}
              </button>

              {/* <TaskDropdownMenu show={show} task={task} /> */}
              <EditTaskModal
                task={task}
                show={showEditTask}
                toggleEdit={toggleEdit}
                onClose={() => setShowEditTask(false)}
                onKey={onKey}
              />
              <DeleteTaskModal
                isShowing={isShowing}
                toggle={toggle}
                taskId={task.id}
              />
            </div>
            <div className="prose">
              <div
                className="border-t pl-1"
                onClick={() => {
                  setShowEditTask(true)
                }}
                dangerouslySetInnerHTML={{
                  __html: marked(task.body)
                }}
              ></div>
            </div>
            {/* <p className="text-sm font-bold text-gray-500">
              Comments{' '}
              <span
                className="text-xs text-blue-300 px-2 border border-blue-300 rounded"
                onClick={() => setShowComments(!showComments)}
              >
                show
              </span>
              <span
                className="text-xs text-blue-300 px-2 border border-blue-300 rounded"
                onClick={() => {
                  console.log('dispatched!')
                }}
              >
                add
              </span>
            </p>
            <ul>
              {task.comments?.length && showComments ? (
                <Comments comments={task.comments} />
              ) : null}
            </ul> */}
          </div>
        )}
      </Draggable>
    </React.Fragment>
  )
}
