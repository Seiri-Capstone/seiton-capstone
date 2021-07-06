import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
const ProjectBoard = dynamic(import('../components/project/ProjectBoard'))
import { tw } from 'twind'

const Project = () => {
  return (
    <div className={tw`pt-[180px]`}>
      <h1 className={tw`text-6xl font-bold text-red-800 text-center mb-8`}>
        My Project
      </h1>
      <ProjectBoard />
    </div>
  )
}

export default Project
