import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Multiselect from 'multiselect-react-dropdown'
import { useDispatch, useSelector } from 'react-redux'
import { assignTask } from '../../store/projectSlice'

const AssignModal = ({ colId, id, toggle, show }) => {
  // const [modal, setModal] = useState('')
  const dispatch = useDispatch()
  const users = useSelector(state => state.project.users)
  const [usersToAssign, setUsersToAssign] = useState([])

  /**
   * On Submit, close the dropdown modal
   */

  // const onSubmit = async e => {
  //   e.preventDefault()
  //   await dispatch(assignTask(task.id))
  //   console.log('dispatched!')
  // }

  // const _users = users.map(({ userId, user }) => {
  //   return { id: userId, name: user.name, email: user.email }
  // })

  // console.log(`🟢  _users `, _users)
  const onSelect = (list, item) => {
    setUsersToAssign([...usersToAssign, item])
  }

  const onRemove = (list, item) => {
    setUsersToAssign(usersToAssign.filter(e => e.id !== item.id))
  }

  const onSubmit = e => {
    e.preventDefault()
    // for all events, loop over the usersToAssign, and use multiple dispatch =>

    // hard code user Id for now...
    usersToAssign.forEach(u => {
      // possible to pass in the column id?
      dispatch(assignTask({ taskId: id, userId: u.id }))
    })
  }

  return show
    ? ReactDOM.createPortal(
        // <form className="bg-gray-800" onSubmit={onSubmit}>
        <div className="w-1/2 h-1/2 z-20 justify-center items-center flex flex-col overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <form
            onSubmit={onSubmit}
            className="bg-gray-100 border border-gray-400 relative w-100 h-40 my-6 mx-auto"
          >
            <Multiselect
              options={users.map(({ userId, user }) => ({
                id: userId,
                name: user.name,
                email: user.email
              }))}
              selectedValues={users ? users[0] : {}}
              onSelect={onSelect}
              onRemove={onRemove}
              displayValue="name"
            />
            <button className="border border-gray-200 p-1 text-gray-800">
              Submit
            </button>
            <button className="text-red-500" onClick={toggle}>
              Close
            </button>
          </form>
        </div>,
        document.getElementById('modal')
      )
    : null
}

export default AssignModal
