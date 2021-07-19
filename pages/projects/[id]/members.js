import React from 'react'
import Navbar from '../../../components/nav/Navbar'
import Members from '../../../components/project/Members'

const members = () => {
  return (
    <div>
      <div className="flex h-screen bg-blue-100 dark:bg-gray-800">
        <Navbar />
        <div className="flex-col ml-24 mt-12 w-8/12">
          <Members />
        </div>
      </div>
    </div>
  )
}

export default members
