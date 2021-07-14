import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import ReactDOM from 'react-dom'
import marked from 'marked'
import { fetchEditTask } from '../../store/projectSlice'
import DeleteTaskModal from './DeleteTaskModal'

export default function EditTaskModal({
  task,
  show,
  toggleEdit,
  onClose,
  onKey
}) {
  const [taskBody, setTaskBody] = useState(task.body)
  const [taskTitle, setTaskTitle] = useState(task.title)
  const [isEditActive, setEditActive] = useState(false)
  const dispatch = useDispatch()

  const handleSave = () => {
    setEditActive(false)
    dispatch(fetchEditTask({ ...task, title: taskTitle, body: taskBody }))
  }

  if (!show) return null
  return ReactDOM.createPortal(
    <div
      onKeyDown={onKey}
      className="justify-center items-center flex flex-col overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
    >
      <div className="relative w-2/5 h-2/3 my-6 mx-auto ">
        {/*content*/}
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex-col items-start p-5 border-b border-solid rounded-t">
            {/*body*/}
            <div className="relative flex-auto">
              <div className="flex items-center justify-between rounded-b border-b mb-2">
                {/* Edit | Pencil */}
                <button
                  className="text-blue-500  font-bold uppercase text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setEditActive(!isEditActive)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-1 h-4 w-4 self-center"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    onClick={() => setEditActive(true)}
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>

                {/* Close X */}
                <button
                  className="text-red-500  font-bold uppercase text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => {
                    onClose()
                    toggleEdit()
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              {isEditActive ? (
                <div>
                  <input
                    className="text-xl font-semibold text-gray-800 border border-gray-500"
                    onChange={e => setTaskTitle(e.target.value)}
                    value={taskTitle}
                  />
                  <textarea
                    ref={input => input && input.focus()}
                    className="my-4 text-sm leading-relaxed italic"
                    name="body"
                    value={taskBody}
                    onChange={e => setTaskBody(e.target.value)}
                    onKeyDown={e => {
                      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                        handleSave()
                        onClose()
                      }
                    }}
                  ></textarea>
                </div>
              ) : (
                <div className="mx-auto">
                  <h3 className="text-xl font-semibold mb-4">{task.title}</h3>
                  <div
                    className="prose prose-sm"
                    dangerouslySetInnerHTML={{
                      __html: marked(taskBody)
                    }}
                  ></div>
                </div>
              )}
            </div>

            {/*footer*/}

            <button
              className="text-blue-500  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => {
                handleSave()
                onClose()
              }}
            >
              Save
            </button>
            <div className="inline text-xs text-gray-500">⌘ or Ctrl Enter</div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('modal')
  )
}
