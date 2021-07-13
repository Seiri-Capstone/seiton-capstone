import React, { useState, useEffect } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import EditTaskModal from './EditTaskModal'
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
