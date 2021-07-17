import React from 'react'
import MyOrgs from '../../components/org/MyOrgs'
import Navbar from '../../components/nav/Navbar'
import Logo from '../../components/Logo'

export default function Org() {
  return (
    <div className="flex h-screen bg-blue-100 dark:bg-gray-800">
      <Navbar />
      <div className="flex-col ml-24 mt-12 w-8/12">
        <MyOrgs />
        <span id="orgModal"></span>
      </div>
    </div>
  )
}
