import React from 'react'
import SingleOrg from '../../components/org/SingleOrg'
import Navbar from '../../components/nav/Navbar'

export default function singleOrg() {
  return (
    <div>
      <div className="flex">
        <Navbar />
        <div className="flex-col">
          <SingleOrg />
        </div>
      </div>
    </div>
  )
}
