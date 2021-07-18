import React from 'react'
import ReactDOM from 'react-dom'
import { useDispatch } from 'react-redux'
import { fetchDeletedOrg } from '../../store/orgsSlice'

function DeleteOrgModal({ deleteShowing, onClose, orgId }) {
  const dispatch = useDispatch()

  const deleteOrg = () => {
    // e.preventDefault()
    dispatch(fetchDeletedOrg(orgId))
    onClose()
  }

  return deleteShowing
    ? ReactDOM.createPortal(
        <div className="justify-center items-center flex flex-col overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-100 h-40 my-6 mx-auto ">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <button
                type="button"
                className=" flex justify-end mr-3 focus:outline-none"
                data-dismiss="modal"
                aria-label="Close"
                onClick={onClose}
              >
                <span
                  className=" flex justify-end outline-none  border-solid"
                  aria-hidden="true"
                >
                  &times;
                </span>
              </button>
              <div className="flex-col items-start p-5 border-b border-solid rounded-t">
                <h6 className="text-md font-semibold text-center">
                  Are you sure you want to delete this organization? All your
                  projects will also be deleted
                </h6>
                <div className="flex items-center justify-center p-6 border-t border-solid  rounded-b">
                  <button
                    className="mr-2 border px-2 rounded text-black-800 hover:text-red-500 border-red-500 focus:outline-none"
                    type="button"
                    onClick={deleteOrg}
                  >
                    Delete
                  </button>
                  <button
                    className="mr-2 border px-2 rounded text-black-800 hover:text-green-500 border-black-500 focus:outline-none"
                    type="button"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.getElementById('orgDeleteModal')
      )
    : null
}

export default DeleteOrgModal
