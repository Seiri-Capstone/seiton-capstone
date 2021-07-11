import React, { useState } from 'react'
import Link from 'next/link'
// import { useMediaQuery } from 'react-responsive'
import Transition from './SideBarTransition'

const UserPage = () => {
  const [isClosed, setClosed] = useState(false)
  // const isStatic = useMediaQuery({
  //   query: '(min-width: 640px)'
  // })
  return (
    <div className="flex bg-gray-100">
      <Transition
        show={!isClosed}
        enter="transition-all duration-500"
        enterFrom="-ml-64"
        enterTo="ml-0"
        leave="transition-all duration-500"
        leaveTo="-ml-64"
      >
        <aside className="bg-white w-64 min-h-screen flex flex-col">
          <div className="bg-white border-r border-b px-4 h-12 flex items-center">
            <span className="text-blue py-2">Hello UserName</span>
          </div>
          <div className="border-r flex-grow">
            <nav>
              <ul>
                <li className="p-3 flex flex-grow items-center justify-between px-5 hover:bg-gray-200 hover:text-gray-700">
                  <Link href="/project">My Projects</Link>
                  <span>2</span>
                </li>
                <li className="p-3 flex flex-grow items-center justify-between px-5 hover:bg-gray-200 hover:text-gray-700">
                  <Link href="/project">Organizations</Link>
                  <span>1</span>
                </li>
                <li className="p-3 flex flex-grow items-center justify-between px-5 hover:bg-gray-200 hover:text-gray-700">
                  <Link href="/project">Chat</Link>
                  <span>23</span>
                </li>
                <li className="p-3 px-5 hover:bg-gray-200 hover:text-gray-700">
                  <Link href="/project">Comments</Link>
                </li>
                <li className="p-3 px-5 hover:bg-gray-200 hover:text-gray-700">
                  <Link href="/editProfile">Update Profile</Link>
                </li>
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
        <div className="flex flex-column">{/* <ProjectBoard /> */}</div>
      </main>
    </div>
  )
}

export default UserPage
