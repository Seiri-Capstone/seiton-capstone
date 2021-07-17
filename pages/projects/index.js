import React from 'react'
import MyProjects from '../../components/projects/MyProjects'
import Navbar from '../../components/nav/Navbar'

export default function Project() {
  return (
    <div className="flex h-screen bg-blue-100 dark:bg-gray-800">
      <Navbar />
      <div className="flex-col ml-24 mt-12 w-8/12">
        <MyProjects />
      </div>
    </div>
  )
}
