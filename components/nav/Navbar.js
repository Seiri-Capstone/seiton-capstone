import React, { useState } from 'react'
import { signOut } from 'next-auth/client'
import Link from 'next/link'
import ThemeSwitch from '../ThemeSwitch'
import Image from 'next/image'
import building from '../../public/buildingIcon.svg'
import book from '../../public/bookIcon.svg'
import box from '../../public/boxIcon.svg'
import signout from '../../public/signoutIcon.svg'
import profile from '../../public/profileIcon.svg'

export default function Navbar() {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div
      className={
        isExpanded
          ? 'flex flex-col sm:flex-row w-44 relative'
          : 'flex flex-col sm:flex-row w-16 relative'
      }
    >
      <div className="w-44 h-screen bg-gradient-to-t from-purple-900 via-indigo-900 to-blue-900 mt-8 sm:mt-0">
        <div className="mr-4 flex flex-col">
          <div className="mt-4 mr-2 self-end">
            {isExpanded ? (
              <button
                tabIndex="1"
                aria-label="Open menu"
                title="Open menu"
                className="w-6  focus:outline-none hover:text-gray-500"
                onClick={() => setIsExpanded(false)}
              >
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                >
                  <path d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </button>
            ) : (
              <button
                tabIndex="1"
                className="h-6 w-6 focus:outline-none hover:text-gray-500"
                aria-label="Close menu"
                title="Close menu"
                onClick={() => setIsExpanded(true)}
              >
                <svg
                  aria-hidden="true"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="white"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            )}
          </div>
          <ThemeSwitch />
        </div>

        <nav className="mt-10">
          <Link href="/orgs">
            <a className="navItem" href="#">
              <Image src={building} alt="buildingIcon" width={24} height={24} />
              <span className={isExpanded ? 'ml-4 font-medium' : 'hidden'}>
                Organizations
              </span>
            </a>
          </Link>
          <Link href="/projects">
            <a className="navItem" href="#">
              <Image src={book} alt="bookIcon" width={24} height={24} />
              <span className={isExpanded ? 'ml-4 font-medium' : 'hidden'}>
                Projects
              </span>
            </a>
          </Link>
          <Link href="/invitations">
            <a className="navItem" href="#">
              <Image src={box} alt="boxIcon" width={24} height={24} />
              <span className={isExpanded ? 'ml-4 font-medium' : 'hidden'}>
                Invitations
              </span>
            </a>
          </Link>

          <span className="absolute bottom-0 my-10">
            <Link href="/user">
              <a className="navItem" href="#">
                <Image src={profile} alt="profileIcon" width={24} height={24} />
                <span className={isExpanded ? 'ml-4 font-medium' : 'hidden'}>
                  My Profile
                </span>
              </a>
            </Link>

            <span onClick={() => signOut()}>
              <a className="navItem" href="#">
                <Image src={signout} alt="signoutIcon" width={24} height={24} />
                <span className={isExpanded ? 'ml-4 font-medium' : 'hidden'}>
                  Sign Out
                </span>
              </a>
            </span>
          </span>
        </nav>
      </div>
    </div>
  )
}
