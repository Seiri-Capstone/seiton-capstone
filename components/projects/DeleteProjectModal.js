import React from 'react'
import ReactDOM from 'react-dom'
import { useDispatch } from 'react-redux'
import { fetchDeletedProject } from '../../store/projectsSlice'
import Transition from '../project/SideBarTransition'

function DeleteProjectModal({ show, onClose, projectId }) {
  const dispatch = useDispatch()

  const deleteOrg = () => {
    dispatch(fetchDeletedProject(projectId))
    onClose()
  }

  return show
    ? ReactDOM.createPortal(
        <div className="justify-center items-center flex flex-col overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none -top-60">
          <Transition
            appear={true}
            show={show}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-75"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-75"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black opacity-0" />
          </Transition>

          <div className="relative w-100 h-40 my-6 mx-auto ">
            <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-gray-900 outline-none focus:outline-none">
              <button
                type="button"
                className=" flex justify-end mr-3 focus:outline-none"
                data-dismiss="modal"
                aria-label="Close"
                onClick={onClose}
              >
                <span
                  className=" flex justify-end outline-none m-2"
                  aria-hidden="true"
                >
                  &times;
                </span>
              </button>
              <div className="flex-col items-start p-5 rounded-lg">
                <h6 className="text-md tracking-wide mb-2  text-center">
                  Are you sure you want to delete this project? <br />
                  You cannot undo this action.
                </h6>
                <div className="flex items-center justify-center py-3">
                  <button
                    className="bg-red-500 dark:bg-gray-600 text-white hover:bg-red-700 dark:text-gray-300 rounded-lg dark:hover:bg-red-500 mx-2 px-3 py-1 text-base shadow-sm"
                    type="button"
                    onClick={deleteOrg}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-skyblue dark:bg-gray-600 text-white hover:bg-navyblue dark:text-gray-300 rounded-lg dark:hover:bg-skyblue mx-2 px-3 py-1 text-base shadow-sm"
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
        document.getElementById('projectDeleteModal')
      )
    : null
}

export default DeleteProjectModal
