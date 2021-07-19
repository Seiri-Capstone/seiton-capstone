import React, { useState, useEffect } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import EditTaskModal from './EditTaskModal'
import marked from 'marked'
import Modal from './DeleteTaskModal'
import TaskDropdownMenu from './TaskDropdownMenu'
import Comments from './Comments'
import { setOptions, useSession } from 'next-auth/client'
import { useDispatch } from 'react-redux'
import { assignTask, pinTask } from '../../store/projectSlice'
import { colors } from '../../styles/colors'
import { comment } from 'postcss'

export default function Task({ task, index, setPin, taskEdit }) {
  // const { isShowing, toggle } = useModal()
  const [taskShow, setTaskShow] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [taskColors, setTaskColors] = useState(colors)
  const [showUser, setShowUser] = useState(false)
  const [i, setI] = useState(0)
  const taskId = task.id
  const { user } = task
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

  const color = taskColors[i % taskColors.length]

  return (
    <React.Fragment>
      <Draggable
        isDragDisabled={task.pinned}
        draggableId={`task-${task.id}`}
        index={index}
      >
        {provided => (
          <div
            className={`flex flex-col bg-gray-100 rounded-lg mb-2 p-1 border-2 border-${color}-500`}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className="flex flex-row items-center">
              <h3
                onClick={() => setShowEditTask(true)}
                className="text-sm px-4 tracking-wide flex-grow"
              >
                {task.title}
              </h3>
              <div className="flex-grow-0">
                {task.pinned ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-700 dark:text-warmGray-300"
                    viewBox="0 0 20 20"
                    fill="gray"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : null}
              </div>
              <span className="ml-2">
                <TaskDropdownMenu
                  // taskShow={taskShow}
                  // setTaskShow={setTaskShow}
                  task={task}
                  taskEdit={taskEdit}
                />
              </span>
              <EditTaskModal
                taskEdit={taskEdit}
                task={task}
                show={showEditTask}
                toggleEdit={toggleEdit}
                onClose={() => setShowEditTask(false)}
                onKey={onKey}
              />
            </div>
            {/* <div className="prose">
              <div
                className="border-t pl-1"
                onClick={() => {
                  setShowEditTask(true)
                }}
                dangerouslySetInnerHTML={{
                  __html: marked(task.body)
                }}
              ></div>
            </div> */}
            {/* user is an [] */}
            <hr className="m-2"></hr>

            <div className="flex items-center justify-between px-2">
              {/* <button
                className={`h-3 w-12 rounded-md bg-${color}-500`}
                onClick={() => {
                  const j = i === taskColors.length - 1 ? 0 : i + 1
                  setI(j)
                }}
              >
              */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 text-${color}-500`}
                viewBox="0 0 24 24"
                fill="currentColor"
                onClick={() => {
                  const j = i === taskColors.length - 1 ? 0 : i + 1
                  setI(j)
                }}
              >
                <circle cx="10" cy="10" r="10" />
              </svg>
              {/* </button> */}
              {/* <button className="task-btn">
                Comments {task.comments ? task.comments.length : null}
              </button> */}
              <button
                onClick={async () => {
                  await dispatch(pinTask(task))
                  await setPin(true)
                }}
                className="task-btn"
              >
                {task.pinned ? 'Unpin' : 'Pin'}
              </button>
              <button
                className="task-btn self-end text-xs"
                onClick={() => setShowUser(!showUser)}
              >
                Assigned to: ({user?.length})
              </button>
            </div>
            {showUser &&
              user?.map(u => (
                <span className="text-sm text-right pl-2" key={u.id}>
                  {u.name}
                </span>
              ))}
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
