import React, { useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/client'
import EditProfile from './EditProfile'
import Transition from './SideBarTransition'
import { useSelector, useDispatch } from 'react-redux'

const UserPage = () => {
  const [isClosed, setClosed] = useState(false)
  const [isShowing, setIsShowing] = useState(false)
  const [session] = useSession()
  const dispatch = useDispatch()

  function toggleUserUpdate() {
    // setClosed(!isClosed)
    setIsShowing(!isShowing)
  }

  const handleUpdate = event => {
    event.preventDefault()
  }

  console.log('session', session)
  return (
    <React.Fragment>
      <div className="flex bg-gray-100">
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
              <span className="text-blue py-2">
                {/* {`Hello`} */}
                {/* // ${
              //   session ? session.user.name : session.user.email
              // } */}
              </span>
            </div>
            <div className="border-r flex-grow">
              <nav>
                <ul>
                  <li className="p-3 flex flex-grow items-center text-gray-400 justify-between px-5 hover:bg-gray-500 hover:text-white">
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
                  </li>
                  {/* <li className="p-3 px-5 hover:bg-gray-200 hover:text-gray-700"> */}
                  {/* <Link href="/editProfile">Update Profile</Link> */}
                  {/* </li> */}
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
              <button className="text-blue underline mr-2  px-2 rounded text-black-800 hover:text-gray-500  focus:outline-none">
                Log out
              </button>
            </div>
          </header>
          <div className="m-10">
            <h2 className=" flex flex-column text-5xl">User information</h2>
            <h2 className="mt-5 flex flex-column text-3xl">{`Hello`}</h2>
            {/* ${session ? session.user.name : session.user.email} */}
            <button
              className="mt-5 border px-2  rounded text-black-800 hover:text-green-400 border-black hover:border-green-400 focus:outline-none"
              onClick={() => setIsShowing(!isShowing)}
            >
              Update Profile
            </button>
            <EditProfile
              isShowing={isShowing}
              toggleUserUpdate={toggleUserUpdate}
              session={session}
            />
          </div>
        </main>
      </div>
      <div id="usermodal"></div>
    </React.Fragment>
  )
}

export default UserPage
