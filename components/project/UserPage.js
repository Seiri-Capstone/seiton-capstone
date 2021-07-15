import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Transition from './SideBarTransition'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from '../../store/userSlice'
import { fetchEditUser } from '../../store/userSlice'

const UserPage = () => {
  const dispatch = useDispatch()
  //toggling true-false states
  const [isClosed, setClosed] = useState(false)
  const [isShowing, setIsShowing] = useState(false)

  //grabbing user from the state
  const user = useSelector(state => state.user)
  //getting user from the DB/componentDidMount
  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  function toggleUserUpdate(event) {
    setIsShowing(!isShowing)
    // event.preventDefault()
  }

  //Set State
  const [firstName, setFirstName] = useState('')
  const [emailState, setEmailState] = useState('')

  // this is used for re-rendering so input fields will get prepopulated with text
  useEffect(() => {
    setFirstName(user.name)
    setEmailState(user.email)
  }, [user])

  //submit to change name and email
  const handleSubmit = event => {
    event.preventDefault()
    const userToUpdate = { id: user.id, name: firstName, email: emailState }
    dispatch(fetchEditUser(userToUpdate))
    toggleUserUpdate()
  }

  return (
    <React.Fragment>
      <div className="flex bg-gray-100">
        {/* transition for the sidebar to move */}
        <Transition
          show={!isClosed}
          enter="transition-all duration-500"
          enterFrom="-ml-64"
          enterTo="ml-0"
          leave="transition-all duration-500"
          leaveTo="-ml-64"
        >
          <aside className="bg-gray-800 w-64 min-h-screen flex flex-col">
            <div className="px-4 h-12 flex items-center">
              <span className="text-blue-200 py-2">
                Hello {user?.name || 'friend'}
              </span>
            </div>
            <div className="border-r flex-grow">
              <nav>
                <ul>
                  <Link href="/orgs">
                    <a className="flex items-center mt-5 py-2 px-8 text-gray-400 border-r-4 border-gray-800 hover:bg-gray-700 hover:text-gray-100 hover:border-gray-100">
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span>Organizations</span>
                    </a>
                  </Link>

                  <Link href="/projects">
                    <a
                      className="flex items-center mt-5 py-2 px-8 text-gray-400 border-r-4 border-gray-800 hover:bg-gray-700 hover:text-gray-100 hover:border-gray-100"
                      href="#"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"></path>
                      </svg>

                      <span>Projects</span>
                    </a>
                  </Link>

                  <a
                    className="flex items-center mt-5 py-2 px-8 text-gray-400 border-r-4 border-gray-800 hover:bg-gray-700 hover:text-gray-100 hover:border-gray-100"
                    href="#"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 100-4V6z"></path>
                    </svg>

                    <span>Tasks</span>
                  </a>

                  <Link href="/invitations">
                    <a
                      className="flex items-center mt-5 py-2 px-8 text-gray-400 border-r-4 border-gray-800 hover:bg-gray-700 hover:text-gray-100 hover:border-gray-100"
                      href="#"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z"
                          clipRule="evenodd"
                        ></path>
                      </svg>

                      <span>Invitations</span>
                    </a>
                  </Link>
                  <div className="absolute bottom-0 my-10">
                    <button
                      onClick={() => signOut()}
                      className="flex items-center py-2 px-8 text-gray-600 hover:text-gray-500"
                    >
                      <span className="mx-4 font-medium">Sign Out</span>
                    </button>
                  </div>
                  {/* <li className="p-3 flex flex-grow items-center text-gray-400 justify-between px-5 hover:bg-gray-500 hover:text-white">
                    <Link href="/projects/1">Create Organization</Link>
                    <span>2</span>
                  </li>
                  <li className="p-3 flex text-gray-400 flex-grow items-center justify-between px-5 hover:bg-gray-500 hover:text-white">
                    <Link href="/project">Create Project</Link>
                    <span>1</span>
                  </li>
                  <li className="p-3 flex text-gray-400 flex-grow items-center justify-between px-5 hover:bg-gray-500 hover:text-white">
                    <Link href="/project">Chat</Link>
                    <span>23</span>
                  </li>
                  <li className="p-3 px-5 text-gray-400 hover:bg-gray-500 hover:text-white">
                    <Link href="/project">Comments</Link>
                  </li> */}
                </ul>
              </nav>
            </div>
          </aside>
        </Transition>
        <main className="flex-grow flex flex-col min-h-screen">
          <header className="bg-white border-b h-12 flex items-center justify-center">
            {isClosed ? (
              <button
                tabIndex="1"
                aria-label="Open menu"
                title="Open menu"
                className="w-6  focus:outline-none hover:text-gray-500"
                onClick={() => setClosed(false)}
              >
                <svg
                  aria-hidden="true"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            ) : (
              <button
                tabIndex="1"
                className="h-6 w-6 focus:outline-none hover:text-gray-500"
                aria-label="Close menu"
                title="Close menu"
                onClick={() => setClosed(true)}
              >
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                >
                  <path d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </button>
            )}
            <div className="flex flex-grow items-center justify-between px-3">
              <h1>Home</h1>
            </div>
          </header>
          <div className="m-10">
            <h2 className=" flex flex-column text-5xl">User information</h2>
            <h2 className="mt-5 flex flex-column text-3xl">
              Hello {user.name || 'friend'}
            </h2>
            <button
              className="mt-5 border px-2  rounded text-black-800 hover:text-green-400 border-black hover:border-green-400 focus:outline-none"
              onClick={toggleUserUpdate}
            >
              Update Profile
            </button>
          </div>
          {/* form to edit user info */}
          {isShowing ? (
            <div className="mt-5 flex justify-center items-center">
              <form
                onSubmit={handleSubmit}
                className="bg-gray-200 w-110 rounded-lg m-4 p-4 flex"
              >
                <div className="flex flex-col space-y-4 space-x-3">
                  <h1 className="text-center">My Profile</h1>
                  <div className="flex flex-col space-y-5 justify-center">
                    <div className="flex flex-row space-x-1">
                      <label className="mt-2">First Name</label>
                      <input
                        value={firstName || ''}
                        className="rounded-lg"
                        type="text"
                        name="firstName"
                        onChange={e => setFirstName(e.target.value)}
                        placeholder="Type Your Name"
                      />
                    </div>
                    <div className="flex flex-row space-x-11">
                      <label className="text-center mt-2">Email</label>
                      <input
                        name="emailState"
                        value={emailState || ''}
                        className="rounded-lg"
                        type="text"
                        onChange={e => setEmailState(e.target.value)}
                        placeholder="Type Your Email"
                      />
                    </div>
                    <button
                      type="submit"
                      className="mr-2 border px-2 m-3 rounded text-black-800 hover:text-green-400 border-black hover:border-green-400 focus:outline-none"
                    >
                      Update My Info
                    </button>
                  </div>
                </div>
              </form>
            </div>
          ) : null}
        </main>
      </div>
      {/* <div id="usermodal"></div> */}
    </React.Fragment>
  )
}

export default UserPage
