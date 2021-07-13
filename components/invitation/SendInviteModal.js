import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactDOM from 'react-dom'
import { fetchProjects } from '../../store/projectsSlice'
import { fetchSingleOrg } from '../../store/orgSlice'
import { fetchCreateInvite } from '../../store/invitationsSlice'

export default function SendInvite({ show, onClose }) {
  const projects = useSelector(state => state.projects)
  const selectedOrg = useSelector(state => state.org) || {}
  const [selectedProject, setSelectedProject] = useState({})
  const [receivingUser, setReceivingUser] = useState({})
  const users = selectedOrg.users || []
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

  useEffect(() => {
    if (selectedProject.project) {
      dispatch(fetchSingleOrg(selectedProject.project.org.id))
    }
  }, [selectedProject.project])

  const handleSend = () => {
    dispatch(
      fetchCreateInvite({
        receivedBy: receivingUser,
        project: selectedProject
      })
    )
    onClose()
  }

  // console.log('selected', selectedProject)
  // console.log('user', receivingUser)

  if (!show) return null
  return ReactDOM.createPortal(
    <div className="justify-center items-center flex flex-col overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-2/5 h-2/3 my-6 mx-auto ">
        {/*content*/}
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex-col items-start p-5 border-b border-solid rounded-t">
            {/*body*/}
            <h1>send invite to: </h1>

            {/*select project dropdown*/}
            <div className="relative p-6 flex-auto">
              <select
                onChange={e => setSelectedProject(projects[e.target.value])}
              >
                <option value="select project..." selected>
                  select project
                </option>
                {projects.map((project, idx) => (
                  <option key={project.projectId} value={idx}>
                    {project.project.name}
                  </option>
                ))}
              </select>
            </div>

            {/*select users dropdown - will only be able to invite users to a project if they are part of the project organization*/}
            <div className="relative p-6 flex-auto">
              {selectedOrg ? (
                <select onChange={e => setReceivingUser(users[e.target.value])}>
                  <option value="select project..." selected>
                    select user
                  </option>
                  {users.map((user, idx) => (
                    <option key={user.userId} value={idx}>
                      {user.user.name}
                    </option>
                  ))}
                </select>
              ) : (
                <select>
                  <option value="select project..." selected>
                    select project
                  </option>
                </select>
              )}
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
                onClick={handleSend}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('inviteModal')
  )
}
