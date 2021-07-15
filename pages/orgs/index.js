import React from 'react'
import MyOrgs from '../../components/org/MyOrgs'
import Navbar from '../../components/project/Navbar'
import Logo from '../../components/Logo'

export default function Org() {
  return (
    <>
      <div>
        <div className="flex">
          <Navbar />
          <div className="flex-col ml-24 mt-12 w-8/12">
            <MyOrgs />
            <div id="orgModal"></div>
          </div>
        </div>
      </div>
    </>
  )
}
