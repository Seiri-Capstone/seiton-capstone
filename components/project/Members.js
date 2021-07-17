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
import { fetchCreateInvite } from '../../store/invitationsSlice'

export default function Members() {
  const project = useSelector(state => state.project)
  const dispatch = useDispatch()
  const [session, loading] = useSession()
  const [searchEmail, setSearchEmail] = useState('')
  const router = useRouter()
  const { query = {} } = router || {}
  const { id = 0 } = query || {}

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
  }

  const handleSend = () => {
    const thunkArg = {
      receivedBy: null,
      projectId: +id,
      orgId: project.orgId,
      searchEmail: searchEmail
    }
    dispatch(fetchCreateInvite(thunkArg))
    setSearchEmail('')
  }

  return (
    <React.Fragment>
      <h1 className="font-ibm text-6xl font-bold text-red-800 dark:text-red-200 text-center mt-8">
        {project.name} / Members
      </h1>

      <div>
        <h1>Members</h1>

        <section>
          <h2>send invite to: </h2>
          <label>Search by email</label>
          <input
            className="w-full p-3 py-2 text-gray-700 border rounded-lg focus:outline-none rows=4 mb-3 focus:outline-none"
            onChange={e => setSearchEmail(e.target.value)}
          ></input>

          <button
            type="submit"
            className="bg-gray-300 text-gray-900 rounded hover:bg-gray-200 p-4 py-2 focus:outline-none"
            onClick={handleSend}
          >
            Send Invite!
          </button>
        </section>

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
    </React.Fragment>
  )
}
