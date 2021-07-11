import React from 'react'
import MyOrgs from '../../components/org/MyOrgs'
import Navbar from '../../components/project/Navbar'

export default function Org() {
  return (
    <div>
      <div className="flex">
        <Navbar />
        <div className="flex-col">
          <h1 className="font-ibm text-6xl font-bold text-red-800 dark:text-red-200 text-center mt-8">
            My Organizations
          </h1>
          <MyOrgs />
        </div>
      </div>
    </div>
  )
}
