import React, { useState, useEffect } from 'react'
import ProjectBoard from '../components/project/ProjectBoard'
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
