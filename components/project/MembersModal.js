import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import ReactDOM from 'react-dom'
import {
  fetchRemoveUserProject,
  fetchAdminUserUpdate
} from '../../store/projectSlice'
import { useSession } from 'next-auth/client'
import { fetchCreateInvite } from '../../store/invitationsSlice'
import Image from 'next/image'
import minusCircle from '../../public/assets/minusCircle.svg'
import { toast } from 'react-toastify'
import { injectStyle } from 'react-toastify/dist/inject-style'
import x from '../../public/assets/xIcon.svg'
import Transition from '../project/SideBarTransition'

export default function MembersModal({ show, onClose, project }) {
  //   const project = useSelector(state => state.project)
  const dispatch = useDispatch()
  const [session, loading] = useSession()
  const [showInvite, setShowInvite] = useState(false)
  const [searchEmail, setSearchEmail] = useState('')
  const users = project.users || []

  const sessionUser = users.filter(user => user.userId === +session?.user.sub)
  const isAdmin = sessionUser.length > 0 ? sessionUser[0].isAdmin : false

  const removeUser = userId => {
    const body = { userId: userId, projectId: project.id }
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
      projectId: +project.id,
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

  if (!show) return null
  return ReactDOM.createPortal(
    <div className="justify-center items-center flex flex-col overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none top-20">
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
      <div className="relative w-2/5 h-2/3 my-6 mx-auto ">
        {/*content*/}
        <div className="p-8 border-0 rounded-lg relative w-full bg-white dark:bg-gray-900 outline-none focus:outline-none flex flex-col">
          <div className="flex justify-between">
            <h3 id="tenor"> Project Members</h3>

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
          </div>
          <hr className="border-1 border-skyblue dark:border-gray-500 pb-2"></hr>
          <div className="flex justify-between ">
            <section className="max-w-full">
              <button
                type="submit"
                className="text-sm pb-4"
                onClick={() => setShowInvite(!showInvite)}
              >
                + Add New Member
              </button>

              {showInvite && (
                <div>
                  <form className=" mx-auto rounded-lg flex flex-col">
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

            <div className="flex justify-between">
              <div className="flex flex-col justify-between">
                {users.map(user => (
                  <div key={user.userId} className="flex justify-between">
                    <div className="ml-2 flex justify-start">
                      <span
                        key={user.userId}
                        className="capitalize tracking-wide leading-relaxed"
                      >
                        - {user.user.name}
                      </span>
                    </div>

                    {isAdmin ? (
                      <div className="mx-2 flex justify-end">
                        <select
                          onChange={e => handleAdminChange(e, user.userId)}
                          defaultValue={user.isAdmin ? true : false}
                          className="bg-white rounded-lg py-1 text-xs lowercase "
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

                        <Image
                          src={minusCircle}
                          alt="minusCircle"
                          width={24}
                          height={24}
                          onClick={() => removeUser(user.userId)}
                          title="Remove User" //hover over for text
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
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('membersModal')
  )
}
