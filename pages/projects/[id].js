import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
const ProjectBoard = dynamic(import('../../components/project/ProjectBoard'))
import Navbar from '../../components/project/Navbar'

const Project = () => {
  return (
    <div>
      <div className="flex">
        <Navbar />
        <div className="flex-col">
          <ProjectBoard />
        </div>
      </div>
      <div id="modal"></div>
    </div>
  )
}

export default Project
