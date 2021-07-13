import React, { useState } from 'react'
import { signOut } from 'next-auth/client'
import Link from 'next/link'
import ThemeSwitch from '../ThemeSwitch'

export default function Navbar() {
  const [isExpanded, setIsExpanded] = useState(true)

  //reference
  // https://ej2.syncfusion.com/react/demos/sidebar/docking-sidebar/index.html

  return (
    <div
      className={
        isExpanded
          ? 'flex flex-col sm:flex-row w-64 h-screen relative'
          : 'flex flex-col sm:flex-row w-10 h-screen relative'
      }
    >
      <div className="w-64 h-screen bg-gray-800 mt-8 sm:mt-0">
        <ThemeSwitch />
        <nav className="mt-10">
          <button
            className="text-gray-100"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            CLICK ME
          </button>
          <a
            className="flex items-center py-2 px-8 bg-gray-700 text-gray-100 border-r-4 border-gray-100"
            href="#"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path>
            </svg>
            <span className={isExpanded ? 'mx-4 font-medium' : 'hidden'}>
              Dashboard
            </span>
          </a>

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
              <span className={isExpanded ? 'mx-4 font-medium' : 'hidden'}>
                Organizations
              </span>
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

              <span className={isExpanded ? 'mx-4 font-medium' : 'hidden'}>
                Projects
              </span>
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

            <span className={isExpanded ? 'mx-4 font-medium' : 'hidden'}>
              Tasks
            </span>
          </a>
        </nav>

        <div className="absolute bottom-0 my-10">
          <a
            className="flex items-center py-2 px-8 text-gray-600 hover:text-gray-500"
            href="#"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
            <span className={isExpanded ? 'mx-4 font-medium' : 'hidden'}>
              Settings
            </span>
          </a>

          <a
            className="flex items-center py-2 px-8 text-gray-600 hover:text-gray-500"
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
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                clipRule="evenodd"
              ></path>
            </svg>
            <Link href="/user">
              <a>My Profile</a>
            </Link>
          </a>
          <button
            onClick={() => signOut()}
            className="flex items-center py-2 px-8 text-gray-600 hover:text-gray-500"
          >
            <span className="mx-4 font-medium">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  )
}
