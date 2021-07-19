import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import {
  fetchProject,
  fetchRemoveUserProject,
  fetchAdminUserUpdate
} from '../../store/projectSlice'
import { useSession } from 'next-auth/client'
import { fetchCreateInvite } from '../../store/invitationsSlice'
import Image from 'next/image'
import minusCircle from '../../public/assets/minusCircle.svg'
import { toast } from 'react-toastify'
import { injectStyle } from 'react-toastify/dist/inject-style'

export default function Members() {
  const project = useSelector(state => state.project)
  const dispatch = useDispatch()
  const [session, loading] = useSession()
  const [showInvite, setShowInvite] = useState(false)
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
    setShowInvite(false)
    setSearchEmail('')
    notify()
  }

  const notify = () => {
    typeof window !== 'undefined' ? injectStyle() : null
    toast.configure()
    toast('Invitation sent !')
  }

  return (
    <React.Fragment>
      <div>
        <h2 id="tenor" className="capitalize leading-loose">
          Project Members
        </h2>

        <section>
          <button
            type="submit"
            className="text-sm pb-4"
            onClick={() => setShowInvite(!showInvite)}
          >
            + Add New Member
          </button>
          {/*   <button onClick={() => router.back()}>Go Back</button>*/}

          {showInvite && (
            <div>
              <form className="max-w-full mx-auto rounded-lg flex flex-col">
                <input
                  className="w-full p-3 py-1 text-gray-700 dark:text-gray-300 border rounded-lg mb-3 shadow-sm"
                  placeholder="Search by Email"
                  onChange={e => setSearchEmail(e.target.value)}
                ></input>
                <button
                  type="submit"
                  className="bg-skyblue dark:bg-gray-600 text-white hover:bg-navyblue dark:text-gray-300 rounded-lg dark:hover:bg-skyblue p-4 py-1 mb-4 text-base shadow-sm"
                  onClick={handleSend}
                >
                  Send Invite
                </button>
              </form>
            </div>
          )}
        </section>

        {users.map(user => (
          <div key={user.userId} className="flex pl-2 my-2">
            <span
              key={user.userId}
              className="capitalize tracking-wide leading-relaxed"
            >
              - {user.user.name}
            </span>

            {isAdmin ? (
              <div className="mx-2 flex justify-center">
                <select
                  onChange={e => handleAdminChange(e, user.userId)}
                  defaultValue={user.isAdmin ? true : false}
                  className="bg-white rounded-lg py-1 text-xs lowercase "
                >
                  <option
                    value={true}
                    defaultValue={user.isAdmin ? true : false}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    Admin
                  </option>
                  <option
                    value={false}
                    defaultValue={user.isAdmin ? false : false}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    Collaborater
                  </option>
                </select>

                <Image
                  src={minusCircle}
                  alt="minusCircle"
                  width={24}
                  height={24}
                  onClick={() => removeUser(user.userId)}
                  className="hover:bg-red-500 ml-4"
                />
              </div>
            ) : user.isAdmin ? (
              <p className="text-xs lowercase pl-2 my-2 tracking-wider">
                (admin)
              </p>
            ) : (
              <p className="text-xs lowercase pl-2 my-2 tracking-wider">
                (collaborater)
              </p>
            )}
          </div>
        ))}
      </div>
    </React.Fragment>
  )
}
