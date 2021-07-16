import React, { useState } from 'react'
// import useModal from './CustomModalHook'
import EditTaskModal from './EditTaskModal'
import DeleteTaskModal from './DeleteTaskModal'
import AssignModal from './AssignModal'
import Transition from './SideBarTransition'

export default function TaskDropdownMenu({ task }) {
  const [isActive, setIsActive] = useState(false)
  // const { isShowing, toggle } = useModal()
  const [isClosed, setClosed] = useState(false)
  const [show, setShow] = useState(false)
  const [isShowing, setIsShowing] = useState(false)
  // show AssignUserModal
  const [assignUser, setAssignUser] = useState(false)

  function toggle() {
    setClosed(!isClosed)
    setIsShowing(!isShowing)
  }
  function toggleEdit() {
    setClosed(!isClosed)
  }

  const toggleAssignUser = () => {
    setAssignUser(!assignUser)
  }

  return (
    <React.Fragment>
      <div className="inline-block relative">
        <button
          onClick={() => setIsActive(!isActive)}
          // onMouseEnter={() => setIsActive(true)}
          // onMouseLeave={() => setIsActive(false)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            ></path>
          </svg>
        </button>
        <Transition
          appear={true}
          show={isClosed}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-75"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-75"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black opacity-0" />
        </Transition>

        <ul
          className={`backdrop-filter backdrop-blur-lg bg-opacity-30 p-2 border-gray-500 bg-gray-200 rounded ${
            isActive ? 'absolute right-2' : 'hidden'
          }`}
        >
          <li>
            <button
              className="text-sm hover:text-green-500"
              onClick={() => {
                setShow(true)
                toggleEdit()
              }}
            >
              Edit
            </button>
          </li>
          <li>
            <button className="text-sm hover:text-red-500" onClick={toggle}>
              Delete
            </button>
          </li>
          <li>
            <button
              className="text-sm hover:text-purple-500"
              onClick={toggleAssignUser}
            >
              Assign User
            </button>
          </li>
        </ul>
      </div>
      <EditTaskModal
        task={task}
        show={show}
        toggleEdit={toggleEdit}
        onClose={() => setShow(false)}
      />
      <DeleteTaskModal isShowing={isShowing} toggle={toggle} taskId={task.id} />
      <AssignModal
        colId={task.columnId}
        id={task.id}
        toggle={toggleAssignUser}
        show={assignUser}
      />
    </React.Fragment>
  )
}
