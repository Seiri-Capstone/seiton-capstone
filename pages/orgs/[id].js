import React from 'react'
import SingleOrg from '../../components/org/SingleOrg'
import Navbar from '../../components/nav/Navbar'

export default function singleOrg() {
  return (
    <div>
      <div className="flex h-screen bg-blue-100 dark:bg-gray-800">
        <Navbar />
        <div className="flex-col ml-24 mt-12 w-8/12">
          <SingleOrg />
        </div>
      </div>
    </div>
  )
}
