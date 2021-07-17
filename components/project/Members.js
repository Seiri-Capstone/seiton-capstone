import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import {
  fetchProject,
  fetchRemoveUserProject,
  fetchAdminUserUpdate
} from '../../store/projectSlice'
import ProjectInvite from './ProjectInvite'
import { useSession } from 'next-auth/client'

export default function Members() {
  const project = useSelector(state => state.project)
  const dispatch = useDispatch()
  const [session, loading] = useSession()
  const router = useRouter()
  const { query = {} } = router || {}
  const { id = 0 } = query || {}
  const [show, setShow] = useState(false)
  const users = project.users || []

  useEffect(() => {
    if (id) {
      ;(async () => {
        dispatch(fetchProject(id))
      })()
    }
  }, [dispatch, id])

  const sessionUser = users.filter(user => user.userId === +session?.user.sub)
  const isAdmin = sessionUser.length > 0 ? sessionUser[0].isAdmin : false

  console.log('⭐️', sessionUser)

  const removeUser = userId => {
    const body = { userId: userId, projectId: id }
    dispatch(fetchRemoveUserProject(body))
  }

  const handleAdminChange = (e, userId) => {
    let adminBool = e.target.value === 'true' ? true : false

    const thunkArg = {
      isAdmin: adminBool,
      projectId: id,
      sessionUserId: sessionUser[0].userId,
      userId: userId
    }
    dispatch(fetchAdminUserUpdate(thunkArg))
    console.log('thunk arg', thunkArg)
  }

  return (
    <React.Fragment>
      <h1 className="font-ibm text-6xl font-bold text-red-800 dark:text-red-200 text-center mt-8">
        {project.name} / Members
      </h1>

      <div>
        <h1>Members</h1>
        <button
          type="submit"
          className="bg-gray-300 text-gray-900 rounded hover:bg-gray-200 p-4 py-2 focus:outline-none"
          onClick={() => setShow(true)}
        >
          Send Invite!
        </button>

        {users.map(user => (
          <div key={user.userId} className="flex">
            <h2>{user.user.name}</h2>

            {isAdmin ? (
              <div>
                <select
                  onChange={e => handleAdminChange(e, user.userId)}
                  defaultValue={user.isAdmin ? true : false}
                >
                  <option
                    value={true}
                    defaultValue={user.isAdmin ? true : false}
                  >
                    Admin
                  </option>
                  <option
                    value={false}
                    defaultValue={user.isAdmin ? false : false}
                  >
                    Collaborater
                  </option>
                </select>

                <button
                  className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white border border-red-500 hover:border-transparent rounded-full"
                  onClick={() => removeUser(user.userId)}
                >
                  X
                </button>
              </div>
            ) : user.isAdmin ? (
              <p>Admin</p>
            ) : (
              <p>Collaborater</p>
            )}
          </div>
        ))}
      </div>
      <ProjectInvite
        show={show}
        onClose={() => setShow(false)}
        project={project}
      />
      <div id="projectInviteModal"></div>
    </React.Fragment>
  )
}
