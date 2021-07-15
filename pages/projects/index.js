import React from 'react'
import MyProjects from '../../components/projects/MyProjects'
import Navbar from '../../components/project/Navbar'

export default function Project() {
  return (
    <div>
      <div className="flex">
        <Navbar />
        <div className="flex-col ml-24 mt-12 w-8/12">
          <MyProjects />
        </div>
      </div>
    </div>
  )
}
