import React from 'react'
import MyProjects from '../../components/projects/MyProjects'
import Navbar from '../../components/project/Navbar'

export default function Project() {
  return (
    <div>
      <div className="flex">
        <Navbar />
        <div className="flex-col">
          <h1 className="font-ibm text-6xl font-bold text-red-800 dark:text-red-200 text-center mt-8">
            My Projects
          </h1>
          <MyProjects />
        </div>
      </div>
    </div>
  )
}
