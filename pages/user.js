import React from 'react'
import UserPage from '../components/project/UserPage'
import Navbar from '../components/nav/Navbar'

const user = () => {
  return (
    <div className="flex h-screen bg-blue-100 dark:bg-gray-800">
      <Navbar />

      <div className="flex-col ml-24 mt-12 w-8/12">
        <UserPage />
      </div>
    </div>
  )
}

export default user
