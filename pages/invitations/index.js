import React from 'react'
import MyInvites from '../../components/invitation/MyInvites'
import Navbar from '../../components/nav/Navbar'

export default function Invitation() {
  return (
    <div className="flex h-screen bg-blue-100 dark:bg-gray-800">
      <Navbar />
      <div className="flex-col ml-24 mt-12 w-8/12">
        <MyInvites />
      </div>
      <div id="inviteModal"></div>
    </div>
  )
}
