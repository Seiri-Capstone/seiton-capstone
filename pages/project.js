import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
const ProjectBoard = dynamic(import('../components/project/ProjectBoard'))
import Navbar from '../components/project/Navbar'

const Project = () => {
  return (
    <div>
      <div className="">
        <h1 className="font-ibm text-6xl font-bold text-red-800 dark:text-red-200 text-center mt-8">
          My Project
        </h1>
      </div>
      <div className="flex">
        <Navbar />
        <ProjectBoard />
      </div>
      <div id="modal"></div>
    </div>
  )
}

export default Project
