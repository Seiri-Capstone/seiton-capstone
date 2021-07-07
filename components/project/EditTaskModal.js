import React, { useState } from 'react'
import { tw, css } from 'twind/css'
import ReactDOM from 'react-dom'

export default function EditTaskModal({ task, show, onClose }) {
  if (!show) return null
  return ReactDOM.createPortal(
    <div
      className={tw`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none`}
    >
      <div className={tw`relative w-auto my-6 mx-auto max-w-3xl`}>
        {/*content*/}
        <div
          className={tw`border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none`}
        >
          {/*header*/}
          <div
            className={tw`flex items-start justify-between p-5 border-b border-solid rounded-t`}
          >
            <h3 className={tw`text-3xl font-semibold`}>{task.title}</h3>

            {/*body*/}
            <div className={tw`relative p-6 flex-auto`}>
              <textarea className={tw`my-4 text-lg leading-relaxed`}>
                {task.body}
              </textarea>
            </div>

            {/*footer*/}
            <div
              className={tw`flex items-center justify-end p-6 border-t border-solid  rounded-b`}
            >
              <button
                className={tw`text-red-500  font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                type="button"
                onClick={onClose}
              >
                Close
              </button>
              <button
                className={tw`text-blue-500  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                type="button"
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

// ;<div>
//   <h1>{task.title}</h1>
//   <textarea>{task.body}</textarea>
//   <button onClick={onClose}>Close</button>
// </div>
