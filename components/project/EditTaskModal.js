import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import ReactDOM from 'react-dom'
import marked from 'marked'
import { fetchEditTask } from '../../store/projectSlice'

export default function EditTaskModal({ task, show, toggleEdit, onClose }) {
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
    <div className="justify-center items-center flex flex-col overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-2/5 h-2/3 my-6 mx-auto ">
        {/*content*/}
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex-col items-start p-5 border-b border-solid rounded-t">
            {/*body*/}
            <div className="relative p-6 flex-auto">
              {isEditActive ? (
                <div>
                  <input
                    className="text-3xl font-semibold"
                    onChange={e => setTaskTitle(e.target.value)}
                    value={taskTitle}
                  />
                  <textarea
                    ref={input => input && input.focus()}
                    className="my-4 text-lg leading-relaxed"
                    name="body"
                    value={taskBody}
                    onChange={e => setTaskBody(e.target.value)}
                  ></textarea>
                </div>
              ) : (
                <div className="my-6 mx-auto">
                  <h3 className="text-3xl font-semibold">{task.title}</h3>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: marked(taskBody)
                    }}
                  ></div>
                </div>
              )}
            </div>

            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid  rounded-b">
              <button
                className="text-red-500  font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setEditActive(true)}
              >
                Edit
              </button>
              <button
                className="text-red-500  font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  onClose()
                  toggleEdit()
                }}
              >
                Close
              </button>
              <button
                className="text-blue-500  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('modal')
  )
}
