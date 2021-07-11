import React, { useState, useEffect } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import EditTaskModal from './EditTaskModal'
import marked from 'marked'
import Modal from './DeleteTaskModal'
// // import useModal from './CustomModalHook'
// import Transition from './SideBarTransition'

// export default function Task(props) {
//   const { task } = props
//   // const { isShowing, toggle } = useModal()
//   const [show, setShow] = useState(false)
//   const [isClosed, setClosed] = useState(false)
//   const taskId = task.id
//   const [isShowing, setIsShowing] = useState(false)
//   function toggle() {
//     setClosed(!isClosed)
//     setIsShowing(!isShowing)
//   }
//   function toggleEdit() {
//     setClosed(!isClosed)
//   }

//   return (
//     <React.Fragment>
//       <Transition
//         appear={true}
//         show={isClosed}
//         enter="transition-opacity duration-300"
//         enterFrom="opacity-0"
//         enterTo="opacity-75"
//         leave="transition-opacity duration-300"
//         leaveFrom="opacity-75"
//         leaveTo="opacity-0"
//       >
//         <div className="fixed inset-0 bg-black opacity-0" />
//       </Transition>
//       <Draggable draggableId={`task-${task.id}`} index={props.index}>
// import useModal from './CustomModalHook'
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
              <h3>{task.title}</h3>
              {/* <div>
                <button
                  onClick={toggle}
                  className="mr-2 border px-2 rounded text-black-800 hover:text-red-500 border-red-500 focus:outline-none"
                >
                  Delete
                </button>
              </div>
              <button
                className="border px-2 rounded text-blue-800 hover:text-blue-500 border-blue-500"
                onClick={() => {
                  toggleEdit()
                  setShow(true)
                }}
              >
                Edit
              </button> */}
              <TaskDropdownMenu
                // toggle={toggle}
                show={show}
                task={task}
              />
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: marked(task.body)
              }}
            ></div>
            <p className="text-sm font-bold text-gray-500">
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
            </ul>
          </div>
        )}
      </Draggable>
      {/* <EditTaskModal
        task={task}
        show={show}
        toggleEdit={toggleEdit}
        onClose={() => setShow(false)}
      />
      <Modal isShowing={isShowing} toggle={toggle} taskId={taskId} /> */}
    </React.Fragment>
  )
}
