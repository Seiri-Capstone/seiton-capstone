import React from 'react'
import SingleOrg from '../../components/org/SingleOrg'
import Navbar from '../../components/project/Navbar'

export default function singleOrg() {
  return (
    <div>
      <div className="flex">
        <Navbar />
        <div className="flex-col">
          <h1 className="font-ibm text-6xl font-bold text-red-800 dark:text-red-200 text-center mt-8">
            Single Org
          </h1>
          <SingleOrg />
        </div>
      </div>
    </div>
  )
}
