import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactDOM from 'react-dom'
import { useSession } from 'next-auth/client'
import { fetchCreateInvite } from '../../store/invitationsSlice'

export default function OrgInvite({ show, onClose, project }) {
  const [session, loading] = useSession()
  const [searchEmail, setSearchEmail] = useState('')
  const dispatch = useDispatch()

  // console.log('project', project)

  const handleSend = () => {
    const thunkArg = {
      receivedBy: null,
      projectId: project.id,
      orgId: project.orgId,
      searchEmail: searchEmail
    }
    console.log('thunkArg', thunkArg)
    dispatch(fetchCreateInvite(thunkArg))
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
            <h2>send invite to: </h2>
            <label>Search by email</label>
            <input
              className="w-full p-3 py-2 text-gray-700 border rounded-lg focus:outline-none rows=4 mb-3 focus:outline-none"
              onChange={e => setSearchEmail(e.target.value)}
            ></input>

            {/*select project dropdown*/}
            <div className="relative p-6 flex-auto"></div>

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
                onClick={handleSend}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('projectInviteModal')
  )
}
