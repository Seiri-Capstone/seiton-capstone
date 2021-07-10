import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
const ProjectBoard = dynamic(import('../components/project/ProjectBoard'))
const NavBar = dynamic(import('../components/project/NavBar'))

const Project = () => {
  const [show, setShow] = useState(false)

  return (
    <>
      <NavBar />
      <div className="pt-[40px]">
        <h1 className="font-ibm text-6xl font-bold text-red-800 dark:text-red-200 text-center mb-8">
          My Project
        </h1>
        <ProjectBoard />
        <div id="modal"></div>
      </div>
    </>
  )
}

export default Project
