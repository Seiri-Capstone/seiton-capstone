import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import ReactDOM from 'react-dom'
import { fetchCreateOrg } from '../../store/orgsSlice'

export default function CreateOrgModal({ show, onClose }) {
  const [orgName, setOrgName] = useState('')
  const dispatch = useDispatch()

  const handleSave = () => {
    dispatch(fetchCreateOrg({ name: orgName }))
    setOrgName('')
    onClose()
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
              <input
                className="my-4 text-lg leading-relaxed border-2 border-blue"
                name="name"
                value={orgName}
                onChange={e => setOrgName(e.target.value)}
              />
            </div>

            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid  rounded-b">
              <button
                className="text-red-500  font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={onClose}
              >
                Close
              </button>
              <button
                className="text-blue-500  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('orgModal')
  )
}
