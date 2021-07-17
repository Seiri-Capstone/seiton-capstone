import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import ReactDOM from 'react-dom'
import { fetchCreateOrg } from '../../store/orgsSlice'
import Image from 'next/image'
import x from '../../public/assets/xIcon.svg'

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
        <div className="p-8 border-0 rounded-lg shadow-lg relative w-full bg-white dark:bg-gray-900 outline-none focus:outline-none flex flex-col">
          <div className="flex justify-between">
            <h3 id="tenor">Add New Organization</h3>
            <Image
              src={x}
              alt="deleteIcon"
              width={24}
              height={24}
              onClick={onClose}
            />
          </div>
          <div className="flex mt-8 w-full">
            <div className="w-full">
              <input
                className="p-3 py-1 text-gray-700 dark:text-gray-300 border rounded-lg mb-3 shadow-sm w-full"
                name="name"
                placeholder="Organization Name"
                value={orgName}
                onChange={e => setOrgName(e.target.value)}
              />
            </div>
            <div className="w-1/3 ">
              <button
                className="bg-transparent text-gray-900 dark:text-gray-300 border border-skyblue rounded-lg hover:bg-skyblue hover:text-white p-4 py-1 ml-4 text-base shadow-sm"
                type="button"
                onClick={handleSave}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('orgModal')
  )
}
