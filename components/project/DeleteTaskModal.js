import React from 'react'
import ReactDOM from 'react-dom'

// Reusable modal, copy to new component and modify to your needs
// working example on how to use it, look at Task model, only 4 lines of code
const Modal = ({ isShowing, hide }) =>
  isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="justify-center items-center flex flex-col overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" />
          <div
            className="flex"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className="flex">
              <div className="modal-header">
                <button
                  type="button"
                  className="flex"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={hide}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <p>Are you sure, you want to delete a task?</p>
            </div>
            <button>Delete</button>
            <button>Cancel</button>
          </div>
        </React.Fragment>,
        document.body
      )
    : null

export default Modal
