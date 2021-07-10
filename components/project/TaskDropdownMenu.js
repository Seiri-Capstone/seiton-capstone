import React, { useState } from 'react'
import useModal from './CustomModalHook'
import EditTaskModal from './EditTaskModal'
import DeleteTaskModal from './DeleteTaskModal'

export default function TaskDropdownMenu({ task }) {
  const [isActive, setIsActive] = useState(false)
  const { isShowing, toggle } = useModal()
  const [show, setShow] = useState(false)

  return (
    <React.Fragment>
      <div className="inline-block relative">
        <button onClick={() => setIsActive(!isActive)}>
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

        <ul className={isActive ? 'block' : 'hidden'}>
          <li>
            <button onClick={() => setShow(true)}>Edit</button>
          </li>
          <li>
            <button onClick={toggle}>Delete</button>
          </li>
        </ul>
      </div>
      <EditTaskModal task={task} show={show} onClose={() => setShow(false)} />
      <DeleteTaskModal isShowing={isShowing} hide={toggle} taskId={task.id} />
    </React.Fragment>
  )
}
