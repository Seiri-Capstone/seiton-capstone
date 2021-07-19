import React from 'react'
import ReactDOM from 'react-dom'
import { useDispatch } from 'react-redux'
import { deleteColumn } from '../../store/projectSlice'
import Transition from './SideBarTransition'

// Reusable modal, copy to new component and modify to your needs
// working example on how to use it, look at Task model, only 4 lines of code
function DeleteColumnModal({ isShowing, onClose, colId, delCol }) {
  const dispatch = useDispatch()

  const submitHandle = async event => {
    const cIdx = +event.target.value
    console.log('handle delete col id', cIdx)
    await dispatch(deleteColumn(cIdx))
    onClose()
    delCol(true) // DELCOL TRUE ==>> pusher does NOT WORK!
  }

  return isShowing
    ? ReactDOM.createPortal(
        <div className="justify-center items-center flex flex-col overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none -top-60">
          <Transition
            appear={true}
            show={isShowing}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-75"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-75"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black opacity-0" />
          </Transition>
          <div className="elative w-100 h-40 mx-4">
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
              <div className="fflex-col items-start p-5 rounded-lg">
                <h6 className="text-md tracking-wide mb-2  text-center">
                  Are you sure you want to delete the column? <br />
                  All associated tasks will also be deleted.
                </h6>
                <div className="flex items-center justify-center py-3">
                  <button
                    className="bg-red-500 dark:bg-gray-600 text-white hover:bg-red-700 dark:text-gray-300 rounded-lg dark:hover:bg-red-500 mx-2 px-3 py-1 text-base shadow-sm"
                    type="button"
                    value={colId}
                    onClick={submitHandle}
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
        document.getElementById('columnDeleteModal')
      )
    : null
}

export default DeleteColumnModal
