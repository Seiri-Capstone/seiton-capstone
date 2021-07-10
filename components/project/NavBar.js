import React from 'react'
import Link from 'next/link'
import profile from '../../pages/profile'
import UserPage from './UserPage'
const NavBar = () => {
  return (
    <nav className="h-50px bg-current p-3 ">
      <ul className="text-white">
        <li>
          <Link href="/profile">
            <a>My Profile</a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
