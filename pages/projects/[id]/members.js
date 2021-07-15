import React from 'react'
import Navbar from '../../../components/project/Navbar'
import Members from '../../../components/project/Members'

const members = () => {
  return (
    <div>
      <div className="flex">
        <Navbar />
        <div className="flex-col">
          <Members />
        </div>
      </div>
    </div>
  )
}

export default members
